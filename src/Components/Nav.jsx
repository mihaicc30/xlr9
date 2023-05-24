import React, { useState, useEffect } from "react";
import { auth } from "../App.jsx";
import ChatNavBar from "./ChatNavBar.jsx";

const Nav = ({ isUser, chatNavBarStatus, setChatNavBarStatus }) => {
	return (
		<>
			<ul className="flex justify-between p-2 items-center">
				<h1 className="text-xl p-1 font-black text-center tracking-widest">
					XLR9
				</h1>
				<div className="flex gap-[4vw]">
					<p>🔍</p>
					<p>🍔</p>
				</div>
				<SignOut /> {/* to move in the burger */}
			</ul>

			<ChatNavBar
				chatNavBarStatus={chatNavBarStatus}
				setChatNavBarStatus={setChatNavBarStatus}
			/>
		</>
	);
};

export default Nav;

const SignOut = () => {
	return (
		auth.currentUser && (
			<button className="b" onClick={() => auth.signOut()}>
				Sign Out
			</button>
		)
	);
};
