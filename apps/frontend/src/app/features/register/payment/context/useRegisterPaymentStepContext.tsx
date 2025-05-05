"use client";
import { getPayment } from "@/app/features/common/api/getPayment";
import type { RootState } from "@/app/redux/store";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useSelector } from "react-redux";
import {
	RegisterPaymentStep,
	type RegisterPaymentUIContextType,
} from "../types/context";

const registerPaymentUIContext = createContext<
	RegisterPaymentUIContextType | undefined
>(undefined);

export const useRegisterPaymentSteps = () => {
	const context = useContext(registerPaymentUIContext);
	if (context === undefined) {
		throw new Error(
			"useIsRegisterPayment must be used within a IsRegisterPaymentProvider",
		);
	}
	return context;
};

export const RegisterPaymentStepsProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [step, setStep] = useState<RegisterPaymentStep>(
		RegisterPaymentStep.Select,
	);
	const { userToken, storeToken } = useSelector(
		(state: RootState) => state.token,
	);

	useEffect(() => {
		const checkExistPaymentData = async () => {
			if (!userToken || !storeToken) {
				return setStep(RegisterPaymentStep.Select);
			}
			const payment = await getPayment(userToken, storeToken);
			if (payment.ok) {
				return setStep(RegisterPaymentStep.Registed);
			}
			return setStep(RegisterPaymentStep.Select);
		};
		checkExistPaymentData();
	}, [userToken, storeToken]);

	function changeRegistStep() {
		setStep(RegisterPaymentStep.Regist);
	}

	function changeRegistedStep() {
		setStep(RegisterPaymentStep.Registed);
	}
	const headingText = (() => {
		switch (step) {
			case RegisterPaymentStep.Select:
				return "ご利用プランを選択";
			case RegisterPaymentStep.Regist:
				return "お支払い情報の入力";
			case RegisterPaymentStep.Registed:
				return "登録完了";
			default:
				return "";
		}
	})();

	const values = {
		step,
		changeRegistStep,
		changeRegistedStep,
		headingText,
	};

	return (
		<registerPaymentUIContext.Provider value={values}>
			{children}
		</registerPaymentUIContext.Provider>
	);
};
