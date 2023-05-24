import MainChat from "./MainChat.jsx";
import MainContacts from "./MainContacts.jsx";
import MainProfile from "./MainProfile.jsx";
import Nav from "./Nav.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = ({ isUser }) => {
	const navigate = useNavigate();

	const [chatNavBarStatus, setChatNavBarStatus] = useState("Chat");

	useEffect(() => {
		if (!isUser) navigate("/");
		return;
	}, [isUser]);

	return (
		<>
			{isUser && (
				<Nav
					isUser={isUser}
					chatNavBarStatus={chatNavBarStatus}
					setChatNavBarStatus={setChatNavBarStatus}
				/>
			)}
			<div className="overflow-y-scroll">
				<main className="flex flex-col px-2">
					{chatNavBarStatus === "Chat" && <MainChat isUser={isUser} />}
					{chatNavBarStatus === "Contact" && <MainContacts isUser={isUser} />}
					{chatNavBarStatus === "Profile" && <MainProfile isUser={isUser} />}
				</main>
			</div>
		</>
	);
};

export default Chat;
