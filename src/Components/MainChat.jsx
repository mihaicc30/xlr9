import React from "react";

const MainChat = () => {
	return (
		<div className="flex flex-col gap-4">
			<p>-curr conv-</p>

			<div className="flex justify-between cursor-pointer p-1 border-2 rounded-md transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-gray-600">
				<img
					src="./1.jpg"
					alt=""
					className="rounded-full border-2 my-1"
					style={{
						width: "clamp(40px, 10vw, 70px)",
						height: "clamp(40px, 10vw, 70px)",
					}}
				/>
				<p className="grow">--status</p>
				<p>--last contacted</p>
			</div>

			<div className="flex justify-between cursor-pointer p-1 border-2 rounded-md transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-gray-600">
				<img
					src="./1.jpg"
					alt=""
					className="rounded-full border-2 my-1"
					style={{
						width: "clamp(40px, 10vw, 70px)",
						height: "clamp(40px, 10vw, 70px)",
					}}
				/>
				<p className="grow">--status</p>
				<p>--last contacted</p>
			</div>



		</div>
	);
};

export default MainChat;
