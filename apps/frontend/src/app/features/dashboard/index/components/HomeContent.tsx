"use client";
import React, { useState } from "react";
import HeadSwitch from "./HeadSwitch";
import MembersContent from "./members/MembersContent";
import ShiftRequestList from "./shiftRequests/ShiftRequestList";

const HomeContent = () => {
	const [select, setSelect] = useState<"SHIFT" | "MEMBER">("SHIFT");

	return (
		<div className="w-full h-auto">
			<HeadSwitch select={select} setSelect={setSelect} />
			{select === "SHIFT" && <ShiftRequestList />}
			{select === "MEMBER" && <MembersContent />}
		</div>
	);
};

export default HomeContent;
