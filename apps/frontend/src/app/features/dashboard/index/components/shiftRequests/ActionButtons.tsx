"use client";
import type { RequestStatus } from "@shared/common/types/prisma";
import type { ShiftRequest } from "@shared/common/types/prisma";
import {
	DrawerView,
	type ShiftRequestWithJson,
	useBottomDrawer,
} from "../../../common/context/useBottomDrawer";

const ActionButtons = ({
	status,
	data,
}: {
	status: RequestStatus;
	data: ShiftRequestWithJson;
}) => {
	const { darawerOpen } = useBottomDrawer();

	switch (status) {
		case "HOLD":
			return (
				<button
					type="button"
					className="w-28 h-7 rounded-full bg-gray02 text-xs text-white font-bold shadow-sm"
					onClick={() => darawerOpen(DrawerView.CREATE_REQUEST, data)}
				>
					作成再開
				</button>
			);

		case "REQUEST":
			return (
				<>
					<button
						type="button"
						className="w-28 h-7 rounded-full bg-green03 text-xs text-green02 font-bold shadow-sm"
						onClick={() => darawerOpen(DrawerView.STATUS, data)}
					>
						提出確認・回収
					</button>
					<button
						type="button"
						className="w-28 h-7 rounded-full bg-green02 text-xs text-white font-bold shadow-sm"
						onClick={() => darawerOpen(DrawerView.SUBMIT, data)}
					>
						シフト提出
					</button>
				</>
			);

		case "ADJUSTMENT":
			return (
				<button
					type="button"
					className="w-28 h-7 rounded-full bg-blue01 text-xs text-white font-bold shadow-sm"
					onClick={() => darawerOpen(DrawerView.ADJUSTMENT, data)}
				>
					調整を見る
				</button>
			);

		case "CONFIRMED":
			return (
				<button
					type="button"
					className="w-28 h-7 rounded-full bg-orange-400 text-xs text-white font-bold shadow-sm"
					onClick={() => darawerOpen(DrawerView.CONFIRM, data)}
				>
					完成確認
				</button>
			);

		default:
			return null;
	}
};

export default ActionButtons;
