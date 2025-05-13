import React from "react";

const UserSection = () => {
	return (
		<section className="ml-8">
			<div className="flex gap-5 items-center mb-6 mt-8">
				<div className="w-14 h-14 bg-gray01 rounded-full" />
				<div className="h-auto text-left">
					<h3 className="text-green01 font-bold text-xs">オーナー</h3>
					<p className="text-black font-bold mt-1">あいうえお</p>
				</div>
			</div>
		</section>
	);
};

export default UserSection;
