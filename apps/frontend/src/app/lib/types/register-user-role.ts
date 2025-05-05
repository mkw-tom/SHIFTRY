import type { UserRole } from "@shared/common/types/prisma";
export type RegisterUserRole = Extract<UserRole, "OWNER" | "STAFF">;
