"use client";
import type { ShiftsOfRequestsType } from "@shared/common/types/json";
import React, { useEffect } from "react";
import { DrawerView, useBottomDrawer } from "../../context/useBottomDrawer";
import {
	CreateRequestStep,
	formDataInit,
	useCreateRequest,
} from "../../context/useCreateRequest";

export const formatInputDate = (date: Date | string) => {
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

export const formatInputDateTime = (date: Date | string) => {
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
};

const CreateRequest = () => {
	const { step, setStep, setFormData, formData } = useCreateRequest();
	const { currentData, view } = useBottomDrawer();
	const now = new Date();
	const today = now.toISOString().split("T")[0];
	const nowDateTime = now.toISOString().slice(0, 16);

	useEffect(() => {
		if (currentData === null) {
			setFormData(formDataInit);
			return;
		}
		if (currentData && view === DrawerView.CREATE_REQUEST) {
			setFormData({
				weekStart: formatInputDate(currentData.weekStart),
				weekEnd: formatInputDate(currentData.weekEnd as Date),
				deadline: formatInputDateTime(currentData.deadline as Date),
				type: currentData.type,
				status: currentData.status,
				requests: currentData.requests as ShiftsOfRequestsType,
			});
			return;
		}
	}, [currentData, view, setFormData]);

	console.log(formData);
	return (
		<div>
			<div className="breadcrumbs text-sm w-full text-green02 font-bold">
				<ul>
					<li>
						<button
							type="button"
							className="text-green02"
							onClick={() => setStep(CreateRequestStep.Period)}
						>
							<span className="text-green02">1. 期間指定</span>
						</button>
					</li>

					<li>
						<button
							type="button"
							className="text-green02"
							onClick={() => setStep(CreateRequestStep.Weekly)}
						>
							<span className="text-green01">2. 曜日シフト</span>
						</button>
					</li>

					<li>
						<button
							type="button"
							onClick={() => setStep(CreateRequestStep.Special)}
						>
							<span className="text-green01">3. 特別な日</span>
						</button>
					</li>
				</ul>
			</div>
			{step === CreateRequestStep.Period && (
				<div className="w-full h-auto mt-2">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-1">
							<span className="text-sm text-black">タイプ：</span>
							<div className="flex gap-3">
								<label htmlFor="weekly" className="flex items-center gap-1">
									<span className="text-black text-sm">週</span>
									<input
										id="weekly"
										type="radio"
										name="radio-9"
										className="radio radio-sm radio-success "
										defaultChecked
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												type: "WEEKLY",
												weekStart: "",
												weekEnd: "",
												deadline: "",
											}))
										}
									/>
								</label>
								<label htmlFor="monthly" className="flex items-center gap-1">
									<span className="text-black text-sm">月</span>
									<input
										id="monthly"
										type="radio"
										name="radio-9"
										className="radio radio-sm radio-success "
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												type: "MONTHLY",
												weekStart: "",
												weekEnd: "",
												deadline: "",
											}))
										}
									/>
								</label>
							</div>
						</div>

						<div className="flex items-center gap-1">
							<span className="text-sm text-black">期間：</span>
							<input
								type="date"
								value={formData?.weekStart || ""}
								className="input input-xs w-1/3"
								min={today}
								onChange={(e) => {
									const startDate = e.target.value;
									let updatedWeekEnd = formData.weekEnd;

									if (formData.type === "WEEKLY") {
										const start = new Date(startDate);
										const end = new Date(start);
										end.setDate(end.getDate() + 6);
										updatedWeekEnd = end.toISOString().split("T")[0]; // "YYYY-MM-DD"
									}
									if (formData.type === "MONTHLY") {
										const start = new Date(startDate);
										const end = new Date(
											start.getFullYear(),
											start.getMonth() + 1,
											0,
										); // 月末日
										updatedWeekEnd = end.toISOString().split("T")[0];
									}

									setFormData((prev) => ({
										...prev,
										weekStart: startDate,
										weekEnd: updatedWeekEnd,
									}));
								}}
							/>

							<span>~</span>
							<input
								type="date"
								value={formData?.weekEnd || ""}
								className="input input-xs w-1/3"
								min={today}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										weekEnd: e.target.value,
									}))
								}
							/>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-sm text-black">提出期限：</span>
							<input
								type="datetime-local"
								className="input input-xs w-1/2"
								value={formData?.deadline || ""}
								min={nowDateTime}
								max={
									formData.weekStart
										? (() => {
												const date = new Date(formData.weekStart);
												date.setDate(date.getDate() - 1); // 前日
												return `${date.toISOString().slice(0, 10)}T23:59`;
											})()
										: undefined
								}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										deadline: e.target.value,
									}))
								}
							/>
						</div>
					</div>
				</div>
			)}

			{step === CreateRequestStep.Weekly && <div>曜日シフト</div>}

			{step === CreateRequestStep.Special && <div>特別な日</div>}
		</div>
	);
};

export default CreateRequest;
