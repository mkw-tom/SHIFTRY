import { useRouter } from "next/navigation";
import type { RegisterUserRole } from "./types/register-user-role";

export const useNavigation = () => {
	const router = useRouter();

	const navigateAfterLineAuth = (role: RegisterUserRole) => {
		if (role === "STAFF") {
			router.push("/register/owner");
		} else {
			router.push("/register/owner");
		}
	};

	const navigateToFail = () => router.push("/auth/fail");

	const navigateToInvite = () => router.push("/register/connect");
	const navigateDashboard = () => router.push("/dashboard");

	const navigateRegisterPayment = () => router.push("/register/payment");

	return {
		navigateAfterLineAuth,
		navigateToFail,
		navigateToInvite,
		navigateDashboard,
		navigateRegisterPayment,
	};
};
