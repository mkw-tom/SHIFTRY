"use client";
import React from "react";
import { useRegisterPaymentSteps } from "../context/useRegisterPaymentStepContext";
import { SelectPlanProvider } from "../context/useSelectPlanContext";
import SuccessPaymentModal from "./registed/SuccessPaymentModal";
import RegisterPaymentForm from "./registerPlan/RegisterPaymentForm";
import SelectPlanModal from "./selectPlan/SelectPlanModal";

const RegisterPaymentContent = () => {
	const { step, headingText } = useRegisterPaymentSteps();

	return (
		<SelectPlanProvider>
			<h2 className="text-center font-bold text-sm text-black border-b-1 border-b-gray01 pb-1">
				{headingText}
			</h2>
			<div className="flex flex-col gap-5 mt-5">
				{step === 0 && <SelectPlanModal />}
				{step === 1 && <RegisterPaymentForm />}
				{step === 2 && <SuccessPaymentModal />}
			</div>
		</SelectPlanProvider>
	);
};

export default RegisterPaymentContent;
