"use client";
import { useNavigation } from "@/app/lib/navigation";
import { setLineToken } from "@/app/redux/slices/token";
import { setRegisterUserInfo } from "@/app/redux/slices/user";
import type { AppDispatch } from "@/app/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectUserRole } from "./useDetectUserRole";
import { useLineAuth } from "./useLineAutth";

export const useSaveLineUserInfo = () => {
	const { userLineInfo, error } = useLineAuth();
	const dispatch = useDispatch<AppDispatch>();
	const role = useDetectUserRole();
	const { navigateAfterLineAuth, navigateToFail } = useNavigation();

	useEffect(() => {
		if (userLineInfo) {
			const { userId, pictureUrl, line_token } = userLineInfo;
			dispatch(setRegisterUserInfo({ pictureUrl, lineId: userId, role }));
			dispatch(setLineToken(line_token));
			navigateAfterLineAuth(role);
		}
	}, [userLineInfo, dispatch, role, navigateAfterLineAuth]);

	useEffect(() => {
		if (error) {
			console.error("エラー:", error);
			navigateToFail();
		}
	}, [error, navigateToFail]);
};
