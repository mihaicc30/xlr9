import React, { useState, useRef, useEffect } from "react";
import { grabConnections } from "../Controller.jsx";

export function MainContactsConnections({ isUser, userData }) {
	const [fR, setFR] = useState(false);

	useEffect(() => {
		const grabConnectionsNow = async () => {
			const query = await grabConnections(isUser.email);
			setFR(query);
		};
		grabConnectionsNow();
	}, [userData]);

	return (
		<details open>
			<summary>Connections</summary>

			<div className="flex flex-col gap-4">
				{fR !== "No connections." &&
					fR.length > 0 &&
					fR.map((req, index) => (
						<div className="flex" key={crypto.randomUUID()}>
							<div className="flex mx-2 gap-[1rem] basis-[14%] ">
								<img
									src="./1.jpg"
									alt="avatar"
									className="w-[80px] h-[80px] bg-black rounded-full mx-1"
								/>
							</div>
							<div className="basis-[72%] flex flex-col">
								<p className="line-clamp-1">Name Xz</p>
								<p className="line-clamp-2">
									Status Status Status Status Status Status Status Status Status
									Status Status Status Status Status{" "}
								</p>
							</div>
							<div className="text-3xl basis-[14%] text-center flex flex-col justify-between">
								<span>📰</span>
								<span>🖊</span>
							</div>
						</div>
					))}

				{fR === "No connections." && <p>You have no connections!</p>}

				{/* 
				<div className="flex">
					<div className="flex mx-2 gap-[1rem] basis-[14%] ">
						<img
							src="./1.jpg"
							alt="avatar"
							className="w-[80px] h-[80px] bg-black rounded-full mx-1"
						/>
					</div>
					<div className="basis-[72%] flex flex-col">
						<p className="line-clamp-1">Name Xz</p>
						<p className="line-clamp-2">
							Status Status Status Status Status Status Status Status Status
							Status Status Status Status Status{" "}
						</p>
					</div>
					<div className="text-3xl basis-[14%] text-center flex flex-col justify-between">
						<span>📰</span>
						<span>🖊</span>
					</div>
				</div>
				<div className="flex">
					<div className="flex mx-2 gap-[1rem] basis-[14%] ">
						<img
							src="./1.jpg"
							alt="avatar"
							className="w-[80px] h-[80px] bg-black rounded-full mx-1"
						/>
					</div>
					<div className="basis-[72%] flex flex-col">
						<p className="line-clamp-1">Name Xz</p>
						<p className="line-clamp-2">
							Status Status Status Status Status Status Status Status Status
							Status Status Status Status Status{" "}
						</p>
					</div>
					<div className="text-3xl basis-[14%] text-center flex flex-col justify-between">
						<span>📰</span>
						<span>🖊</span>
					</div>
				</div> */}
			</div>
		</details>
	);
}
