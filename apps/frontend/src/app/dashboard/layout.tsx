// app/dashboard/layout.tsx

import type { ReactNode } from "react";
import { SessionProvider } from "../features/dashboard/common/useSessionCheck";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
		</>
	);
}
