"use client";
import type { RootState } from "@/app/redux/store";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useSelector } from "react-redux";

export enum RegisterStep {
	Auth = 0,
	Register = 1,
	InviteBot = 2,
}
export type RegisterUIContextType = {
	step: RegisterStep;
	changeInviteBotStep: () => void;
};

const registerUIContext = createContext<RegisterUIContextType | undefined>(
	undefined,
);

export const useRegisterSteps = () => {
	const context = useContext(registerUIContext);
	if (context === undefined) {
		throw new Error("useIsRegister must be used within a IsRegisterProvider");
	}
	return context;
};

export const RegisterStepsProvider = ({
	children,
}: { children: ReactNode }) => {
	const [step, setStep] = useState<RegisterStep>(RegisterStep.Auth);
	const { user } = useSelector((state: RootState) => state.user);
	const token = useSelector((state: RootState) => state.token);

	useEffect(() => {
		if (token.userToken && token.storeToken) {
			setStep(RegisterStep.InviteBot);
		} else if (user?.lineId) {
			setStep(RegisterStep.Register);
			return;
		}
	}, [user?.lineId, token.userToken, token.storeToken]);

	function changeInviteBotStep() {
		setStep(RegisterStep.InviteBot);
	}

	return (
		<registerUIContext.Provider value={{ step, changeInviteBotStep }}>
			{children}
		</registerUIContext.Provider>
	);
};
