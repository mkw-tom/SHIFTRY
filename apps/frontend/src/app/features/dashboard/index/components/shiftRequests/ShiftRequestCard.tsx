import { MDW, YMDHM, YMDW } from "@/app/features/common/hooks/useFormatDate";
import type { ShiftRequest } from "@shared/common/types/prisma";
import type { RequestStatus } from "@shared/common/types/prisma";
import React from "react";
import ActionButtons from "./ActionButtons";

const statusBadgeMap: Record<
	RequestStatus,
	{ text: string; colorClass: string }
> = {
	HOLD: { text: "下書き", colorClass: "bg-gray02" },
	REQUEST: { text: "提出期間中", colorClass: "bg-green01" },
	ADJUSTMENT: { text: "調整中", colorClass: "bg-blue01" },
	CONFIRMED: { text: "確定", colorClass: "bg-orange-400" },
};

const ShiftRequestCard = ({ data }: { data: ShiftRequest }) => {
	const { text, colorClass } = statusBadgeMap[data.status] ?? {
		text: "不明",
		colorClass: "bg-gray-400",
	};

	return (
		<li
			key={data.id}
			className="bg-white h-auto w-full rounded-xl p-4 shadow-md"
		>
			<div className="flex justify-between items-center">
				<div
					className={`badge badge-sm ${colorClass} text-white rounded-full font-bold text-[10px] w-18 border-none`}
				>
					{text}
				</div>
				<p className="text-xs text-gray02">更新：{YMDHM(data.updatedAt)}</p>
			</div>
			<h2 className="w-full text-left mt-5 text-black font-bold border-b border-gray01 pl-1">
				{YMDW(data.weekStart)} ~ {MDW(data.weekEnd as Date)}
			</h2>
			<p className="w-full text-left text-error text-xs font-bold pt-0.5 pl-1">
				提出期限：{YMDHM(data.deadline as Date)}
			</p>
			<div className="mt-3 flex items-center justify-end gap-2">
				<ActionButtons status={data.status} data={data} />
				{/* <button
          type="button"
          className="w-28 h-7 rounded-full bg-green03 text-xs text-green02 font-bold border-none shadow-sm"
          onClick={() => darawerOpen(DrawerView.STATUS)}
        >
          提出確認・回収
        </button>
        <button
          type="button"
          className="w-28 h-7 rounded-full bg-green02 text-xs text-white font-bold border-none shadow-sm"
          onClick={() => darawerOpen(DrawerView.SUBMIT)}
        >
          シフト提出
        </button> */}
			</div>
		</li>
	);
};

export default ShiftRequestCard;
