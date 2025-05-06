"use client";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

export type RegisterLoadingUIContextType = {
	pageLoading: boolean;
	setPageLoading: Dispatch<SetStateAction<boolean>>;
	apiLoading: boolean;
	setApiLoading: Dispatch<SetStateAction<boolean>>;
};

const RegisterLoadingUIContext = createContext<
	RegisterLoadingUIContextType | undefined
>(undefined);

export const useRegisterLoadingUI = () => {
	const context = useContext(RegisterLoadingUIContext);
	if (context === undefined) {
		throw new Error("useIsRegister must be used within a IsRegisterProvider");
	}
	return context;
};

export const RegisterLoadingUIProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [pageLoading, setPageLoading] = useState<boolean>(true);
	const [apiLoading, setApiLoading] = useState<boolean>(false);

	const value = {
		pageLoading,
		setPageLoading,
		apiLoading,
		setApiLoading,
	};

	return (
		<RegisterLoadingUIContext.Provider value={value}>
			{children}
		</RegisterLoadingUIContext.Provider>
	);
};
