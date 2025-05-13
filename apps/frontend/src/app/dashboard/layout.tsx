import type { ReactNode } from "react";
import Header from "../features/dashboard/common/components/Header";
import BottomDrawer from "../features/dashboard/common/components/bottomDrawer/BottomDrawer";
import { BottomDrawerProvider } from "../features/dashboard/common/context/useBottomDrawer";
import { SessionProvider } from "../features/dashboard/common/hook/useSessionCheck";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<BottomDrawerProvider>
				<SessionProvider>
					<Header />
					{children}
					<BottomDrawer />
				</SessionProvider>
			</BottomDrawerProvider>
		</>
	);
}
