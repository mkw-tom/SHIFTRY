import { setStores } from "@/app/redux/slices/stores";
import { setUserToken } from "@/app/redux/slices/token";
import { setUser } from "@/app/redux/slices/user";
import type { AppDispatch } from "@/app/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../api/login"; // API関数

export const useLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const handleLogin = async ({
		lineToken,
	}: {
		lineToken: string;
	}) => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await login(lineToken);
			if (!res.ok) {
				if ("errors" in res) {
					setError("通信エラーが発生しました");
					console.warn(res.message, res.errors);
					return;
				}
				setError("通信エラーが発生しました");
				console.warn("エラー:", res.message);
				return;
			}

			dispatch(setUserToken(res.user_token));
			dispatch(setUser(res.user));
			dispatch(setStores(res.stores));
		} catch (err) {
			setError("通信エラーが発生しました。");
			console.warn("通信エラー:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return { handleLogin, isLoading, error };
};
