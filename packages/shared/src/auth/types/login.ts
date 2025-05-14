import type { ShiftRequest, Store, User } from "../../common/types/prisma";

export interface AutoLoginServiceResponse {
	user: User | null;
	store: Store | null;
	shiftRequests: ShiftRequest[]
}

export interface AutoLoginResponse {
	ok: true;
	user: User;
	store: Store;
	shiftRequests: ShiftRequest[]
}
