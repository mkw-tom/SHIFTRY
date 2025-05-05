"use client";
import type { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Session = {
	session: boolean;
};

const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
	const context = useContext(SessionContext);
	if (!context)
		throw new Error("useSession must be used within SessionProvider");
	return context;
};

export const SessionProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const router = useRouter();
	const { userToken } = useSelector((state: RootState) => state.token);
	const [session, setSession] = useState<boolean>(false);

	useEffect(() => {
		if (userToken) {
			router.replace("/register/staff");
		} else {
			setSession(true);
		}
	}, [userToken, router]);

	if (!session) return null; // or ローディング画面

	return (
		<SessionContext.Provider value={{ session }}>
			{children}
		</SessionContext.Provider>
	);
};
