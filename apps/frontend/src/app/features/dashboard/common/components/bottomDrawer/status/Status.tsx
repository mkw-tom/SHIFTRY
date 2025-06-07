import React, { useState } from "react";
import CreateShiftButton from "./CreateShiftButton";
import NotSubmitShiftList from "./NotSubmitShiftList";
import StatusHeadSwitch from "./StatusHeadSwitch";
import SubmittedShiftList from "./SubmittedShiftLIst";

const Status = () => {
	const [select, setSelect] = useState<"SUBMITTED" | "NOT_SUBMIT">("SUBMITTED");
	return (
		<div>
			<StatusHeadSwitch select={select} setSelect={setSelect} />
			<div className="h-[410px] pb-56 overflow-y-auto">
				<div className="flex gap-1 flex-col px-2 pt-4">
					{select === "SUBMITTED" && <SubmittedShiftList />}
					{select === "NOT_SUBMIT" && <NotSubmitShiftList />}
				</div>
			</div>
			<CreateShiftButton />
		</div>
	);
};

export default Status;
