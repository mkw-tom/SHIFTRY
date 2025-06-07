"use client";
import type { RootState } from "@/app/redux/store";
import { ShiftStatus } from "@shared/common/types/prisma";
import type { UpsertSubmittedShiftInputType } from "@shared/shift/submit/validations/put";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetSubmittedShiftUserOne } from "../../../api/get-shift-submit-one/hook";
import { useUpsertSubmitShift } from "../../../api/upsert-shift-submit/hook";
import { useBottomDrawer } from "../../../context/useBottomDrawer";
import SaveDataLoading from "../create-request/SaveDataLoading";
import AvailableWeeksForm from "./AvailableWeeksForm";
import SpecificDatesForm from "./SpecificDatesForm";
import SubmitButton from "./SubmitButton";
import WeekCountForm from "./WeekCountForm";

export type DayOfWeekType =
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday"
	| "Sunday";

const Submit = () => {
	const { currentData, drawerClose } = useBottomDrawer();
	const { userToken, storeToken } = useSelector(
		(state: RootState) => state.token,
	);
	const { user } = useSelector((state: RootState) => state.user);
	const [reSubmit, setReSubmit] = useState(false);

	const { handleGetSubmitShiftUserOne, isLoading: getDataLoading } =
		useGetSubmittedShiftUserOne();
	const { handleUpsertSubmitShift, isLoading: submitDataLoading } =
		useUpsertSubmitShift();

	const formDataInit = useMemo(
		() => ({
			shiftRequestId: currentData?.id ?? "",
			status: ShiftStatus.ADJUSTMENT,
			shifts: {
				name: user?.name ?? "",
				weekCountMax: 0,
				weekCountMin: 0,
				availableWeeks: [],
				specificDates: [],
				submittedAt: new Date().toISOString(),
			},
		}),
		[currentData?.id, user?.name],
	);

	const fetchData = useCallback(async () => {
		if (!userToken || !storeToken || !currentData?.id) return;

		const res = await handleGetSubmitShiftUserOne({
			userToken,
			storeToken,
			shiftRequestId: currentData.id,
		});

		if (res?.ok && res.submittedShift !== null) {
			setFormData({
				shiftRequestId: res.submittedShift.shiftRequestId,
				status: res.submittedShift.status,
				shifts:
					typeof res.submittedShift.shifts === "string"
						? JSON.parse(res.submittedShift.shifts)
						: (res.submittedShift.shifts ?? formDataInit.shifts),
			});
			setReSubmit(true);
		} else {
			setFormData(formDataInit);
		}
	}, [
		userToken,
		storeToken,
		currentData?.id,
		handleGetSubmitShiftUserOne,
		formDataInit,
	]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const saveSubmitShift = async () => {
		if (!userToken || !storeToken) {
			throw new Error("トークン情報がありません");
		}
		await handleUpsertSubmitShift({ userToken, storeToken, formData });
		drawerClose();
		setFormData(formDataInit);
	};

	const [formData, setFormData] =
		useState<UpsertSubmittedShiftInputType>(formDataInit);

	const isSubmitDisabled =
		formData.shifts.weekCountMin === 0 ||
		formData.shifts.weekCountMax === 0 ||
		formData.shifts.availableWeeks.length === 0;

	return (
		<div className="">
			{getDataLoading && <SaveDataLoading />}
			<div className="h-[450px] pb-56 overflow-y-auto">
				<div className="flex  gap-1 flex-col px-2 pt-4">
					<WeekCountForm formData={formData} setFormData={setFormData} />
					<AvailableWeeksForm setFormData={setFormData} formData={formData} />
					<SpecificDatesForm setFormData={setFormData} formData={formData} />
				</div>
			</div>
			<SubmitButton
				isSubmitDisabled={isSubmitDisabled}
				saveSubmitShift={saveSubmitShift}
				submitDataLoading={submitDataLoading}
				reSubmit={reSubmit}
			/>
		</div>
	);
};

export default Submit;
