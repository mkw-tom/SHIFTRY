"use client";
import React from "react";
import { DrawerView, useBottomDrawer } from "../../context/useBottomDrawer";
import { CreateRequestProvider } from "../../context/useCreateRequest";
import Adjustment from "./Adjustment";
import Confirm from "./Confirm";
import Status from "./Status";
import Submit from "./Submit";
import ActionButton from "./create-request/ActionButton";
import CreateRequest from "./create-request/CreateRequest";
import DrawerHead from "./elements/DrawerHead";

const BottomDrawer = () => {
	const { isOpen, drawerClose, view } = useBottomDrawer();
	return (
		<>
			<button
				type="button"
				className={`fixed h-auto top-0 bottom-0 left-0 right-0  z-20 ${
					isOpen ? "bg-[color:var(--color-overlay)]" : "hidden"
				}`}
				onClick={drawerClose}
				onTouchStart={drawerClose}
			/>
			<div className="">
				<div
					className={`fixed h-[600px] w-full bottom-0 bg-base z-30 rounded-t-xl transition duration-150 ease-in-out ${
						!isOpen && "translate-y-[600px] "
					} `}
				>
					<div className="w-full h-8 flex items-center ">
						<button
							type="button"
							className="bg-gray02 w-32 h-2 mx-auto rounded-full"
							onClick={drawerClose}
						/>
						{/* {(view === DrawerView.ADJUSTMENT ||
							view === DrawerView.SUBMIT ||
							view === DrawerView.CREATE_REQUEST) && (
							<button
								type="button"
								className="absolute top-2 right-3 text-green01 text-sm font-bold"
								onClick={drawerClose}
							>
								下書き保存
							</button>
						)} */}
					</div>
					<div className="w-11/12 mx-auto ">
						<DrawerHead />
						{view === DrawerView.CREATE_REQUEST && (
							<CreateRequestProvider>
								<CreateRequest />
								<ActionButton />
							</CreateRequestProvider>
						)}
						{view === DrawerView.SUBMIT && <Submit />}
						{view === DrawerView.STATUS && <Status />}
						{view === DrawerView.ADJUSTMENT && <Adjustment />}
						{view === DrawerView.CONFIRM && <Confirm />}
					</div>
				</div>
			</div>
		</>
	);
};

export default BottomDrawer;
