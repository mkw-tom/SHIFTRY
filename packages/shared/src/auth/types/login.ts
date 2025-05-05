import type { Store, User } from "../../common/types/prisma";

export interface LoginServiceResponse {
	user: User | null;
	stores: Store[];
}

export interface LoginResponse {
	ok: true;
	user: User;
	stores: Store[];
}
