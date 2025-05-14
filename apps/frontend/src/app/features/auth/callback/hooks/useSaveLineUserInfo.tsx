"use client";
import { useNavigation } from "@/app/lib/navigation";
import { setLineToken } from "@/app/redux/slices/token";
import { setRegisterUserInfo } from "@/app/redux/slices/user";
import type { AppDispatch } from "@/app/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectMode } from "./useDetectMode";
import { useDetectRole } from "./useDetectRole";
import { useLineAuth } from "./useLineAuth";

export const useSaveLineUserInfo = () => {
	const { userLineInfo, error } = useLineAuth();
	const dispatch = useDispatch<AppDispatch>();
	const role = useDetectRole();
	const mode = useDetectMode();
	const { navigateAfterLineAuth, navigateToFail, navigateDashboard } =
		useNavigation();

	useEffect(() => {
		if (userLineInfo && mode === "register") {
			const { userId, pictureUrl, line_token } = userLineInfo;
			dispatch(setRegisterUserInfo({ pictureUrl, lineId: userId, role }));
			dispatch(setLineToken(line_token));
			navigateAfterLineAuth(role);
		} else if (userLineInfo && mode === "login") {
			const { userId, pictureUrl, line_token } = userLineInfo;
			window.alert("ログインできたよ");
			navigateDashboard();
		}
	}, [
		userLineInfo,
		dispatch,
		role,
		navigateAfterLineAuth,
		navigateDashboard,
		mode,
	]);

	useEffect(() => {
		if (error) {
			console.error("エラー:", error);
			navigateToFail();
		}
	}, [error, navigateToFail]);
};
