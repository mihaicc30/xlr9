import React, { useState, useRef, useEffect } from "react";
import {
	getFriendRequests,
	rejectFriendRequest,
	acceptFriendRequest,
} from "../Controller.jsx";

export function MainContactsRequests({ isUser, userData }) {
	const [fR, setFR] = useState(false);

	useEffect(() => {
		const grabFriendRequests = async () => {
			const query = await getFriendRequests(isUser.email);
			setFR(query);
		};
		grabFriendRequests();
	}, [userData]);

	const handleRejectFriendRequest = async (ownEmail, targetEmail) => {
		const query = await rejectFriendRequest(ownEmail, targetEmail);
	};

	const handleAcceptFriendRequest = async (ownEmail, targetEmail) => {
		const query = await acceptFriendRequest(ownEmail, targetEmail);
	};

	return (
		<details open className="my-8">
			<summary>Requests</summary>
			<div className="flex flex-col gap-4">
				{fR !== "No requests." &&
					fR.length > 0 &&
					fR.map((req, index) => (
						<div className="flex " key={crypto.randomUUID()}>
							<div className="flex grow justify-center mx-2 gap-[1rem]">
								<img
									src={req.photo}
									alt="avatar"
									className="w-[50px] h-[50px] bg-black rounded-full mx-1"
								/>
								<p className="line-clamp-2">
									{req.name} is trying to connect with you!
								</p>
							</div>
							<div
								className="text-3xl basis-1/6 text-center"
								onClick={() =>
									handleRejectFriendRequest(isUser.email, req.email)
								}>
								❌
							</div>
							<div
								className="text-3xl basis-1/6 text-center"
								onClick={() => handleAcceptFriendRequest(isUser.email, req.email)}>
								✅
							</div>
						</div>
					))}

				{fR === "No requests." && <p>You have no requests!</p>}
			</div>
		</details>
	);
}
