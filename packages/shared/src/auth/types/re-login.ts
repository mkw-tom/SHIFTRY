import type { User, Store } from "../../common/types/prisma";

export interface LoginWithLineResponse {
	ok: true;
	user_token: string;
	user: User;
	stores: Store[]
}
