import type { AutoLoginResponse } from "@shared/auth/types/login";
import type { ErrorResponse } from "@shared/common/types/errors";
import type { Request, Response } from "express";
import autoLogin from "./service";

export const autoLoginController = async (
	req: Request,
	res: Response<AutoLoginResponse | ErrorResponse>,
): Promise<void> => {
	try {
		const userId = req.userId as string;
		const storeId = req.storeId as string;
		const groupId = req.groupId as string;

		const { user, store, shiftRequests } = await autoLogin(userId, storeId);
		if (!user) {
			res.status(404).json({ ok: false, message: "user is not found" });
			return;
		}
		if (!store) {
			res.status(404).json({ ok: false, message: "store data is not found" });
			return;
		}
		if (store.groupId !== groupId) {
			res.status(403).json({ ok: false, message: "invalid groupId" });
			return;
		}

		res.json({ ok: true, user, store, shiftRequests });
	} catch (error) {
		console.error("Error in loginController:", error);
		res.status(500).json({ ok: false, message: "failed to login" });
	}
};
