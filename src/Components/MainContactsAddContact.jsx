import React, { useState, useRef, useEffect } from "react";
import { sendFriendRequest } from "../Controller.jsx";

export function MainContactsAddContact({ isUser, userData }) {
	const addContactInput = useRef(null);
	const [err, setErr] = useState(null)

    useEffect(()=>{},[userData])
	
	const handleAddContact = async (e) => {
		if (e.key === "Enter" || e.key === undefined) {
			const response = await sendFriendRequest(
				addContactInput.current.value,
				isUser,
			);
			setErr(response)
			console.log(response);
		}
	};

	return (
		<details open className="my-8">
			<summary>Add Contact</summary>

			<div className="my-4 border-2 flex justify-between ">
				<p className="text-3xl basis-1/6 text-center m-auto">📧</p>
				<div className="grow flex flex-col">
					{err && <p className="break-all">{err}</p>}
					<label htmlFor="status" className="text-gray-400">
						Input email
					</label>
					<input
						ref={addContactInput}
						type="text"
						name="status"
						defaultValue={""}
						className="py-2 max-w-100 max-[300px]:w-[90%] border-b-2 mb-2"
						onKeyDown={handleAddContact}
					/>
				</div>
				<button
					type="button"
					className="text-3xl basis-1/6 text-center m-auto"
					onClick={handleAddContact}>
					▶
				</button>
			</div>
			
		</details>
	);
}
