import React from "react";
import LoginWithLineButton from "./LoginWithLineButton";

const LoginFormArea = () => {
	return (
		<div className="flex justify-center mt-10 w-full">
			<div className="w-10/12 h-auto bg-white rounded-xl shadow-lg px-5 py-5">
				<h2 className="text-center font-bold text-sm text-black border-b-1 border-b-gray01 pb-1">
					ログイン
				</h2>

				<div className="flex flex-col gap-5 mt-5">
					{/* <p className="text-center text-xs font-bold py-3">
						LINEでログインする
						<br />
					</p> */}
					<LoginWithLineButton />
				</div>
			</div>
		</div>
	);
};

export default LoginFormArea;
