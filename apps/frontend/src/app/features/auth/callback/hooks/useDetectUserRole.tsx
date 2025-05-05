"use client";
import type { RegisterUserRole } from "@/app/lib/types/register-user-role";
import { useSearchParams } from "next/navigation";

export const useDetectUserRole = (): RegisterUserRole => {
	const searchParams = useSearchParams();
	const role = searchParams.get("state");
	return role === "STAFF" ? "STAFF" : "OWNER";
};
