import FirstView from "@/app/features/common/components/FirstView";
import LoginFormArea from "../features/login/components/LoginFormArea";

const Page = () => {
	return (
		<main className="bg-green01 w-full  h-lvh">
			<div className="bg-green01 w-full md:w-[400px] mx-auto">
				<FirstView />

				<LoginFormArea />
			</div>
		</main>
	);
};

export default Page;
