import React, { useEffect } from "react";

const ChatNavBar = ({ chatNavBarStatus, setChatNavBarStatus }) => {
	useEffect(() => {}, [chatNavBarStatus]);

	const handleEvent = (e) => {
		setChatNavBarStatus(e.target.textContent);
	};

	return (
		<div className="flex justify-evenly">
			<button
				className={`${
					chatNavBarStatus == "Chat" ? "navActive" : ""
				} grow  py-1 my-1 bg-white`}
				onClick={handleEvent}>
				Chat
			</button>
			<span className="border-x-2"></span>
			<button
				className={`${
					chatNavBarStatus == "Contact" ? "navActive" : ""
				} grow  py-1 my-1 bg-white`}
				onClick={handleEvent}>
				Contact
			</button>
			<span className="border-x-2"></span>
			<button
				className={`${
					chatNavBarStatus == "Profile" ? "navActive" : ""
				} grow  py-1 my-1 bg-white`}
				onClick={handleEvent}>
				Profile
			</button>
		</div>
	);
};

export default ChatNavBar;
