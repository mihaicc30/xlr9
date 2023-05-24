import React, { useEffect, useState } from "react";
import { getUser } from "../Controller.jsx";

const MainProfile = ({ isUser }) => {
	const [user, setUser] = useState({
        "status": "",
        "email": "alemihai25@gmail.com",
        "friends": [],
        "photo": "https://lh3.googleusercontent.com/a/AGNmyxYIXnrxIktICbL65pMeoDeMvZDfwR9fXOCx2-gP9Q=s96-c",
        "conversations": [],
        "groups": [],
        "name": "mihai c",
        "date": {
            "seconds": 1684921952,
            "nanoseconds": 127000000
        },
        "uid": "3V6bVGEuUmbBpr7gHIzfNqczTk02",
        "phone": ""
    });

	useEffect(() => {
		if (!isUser) return;
		const fetchData = async () => {
			const user = await getUser(isUser.uid);
			setUser(user);
			console.log("🚀 ~ file: MainProfile.jsx:8 ~ MainProfile ~ user:", user);
		};
		// fetchData();
	}, [isUser]);

	return (
		<div>
			<form className="flex flex-col ">
				<img
					src={user.photo}
					alt="avatar"
					className="rounded-full w-[30vw] mx-auto mt-10"
				/>
				<div className="my-4 border-2 flex justify-between ">
					<p className="text-3xl basis-1/6 text-center">🚍</p>
					<div className="grow flex flex-col">
						<label htmlFor="Avatar" className="text-gray-400">
							Avatar
						</label>
						<input
							type="text"
							name="Avatar"
							value={user.photo}
							className="py-2 max-w-100 max-[300px]:w-[90%]"
						/>
					</div>
					<p className="text-3xl basis-1/6 text-center">🖊</p>
				</div>
			</form>
			<form className="flex flex-col ">
                
				<div className="my-4 border-2 flex justify-between ">
					<p className="text-3xl basis-1/6 text-center">🚍</p>
					<div className="grow flex flex-col">
						<label htmlFor="Status" className="text-gray-400">
                        Status
						</label>
						<input
							type="text"
							name="Status"
							value={user.status}
							className="py-2 max-w-100 max-[300px]:w-[90%]"
						/>
					</div>
					<p className="text-3xl basis-1/6 text-center">🖊</p>
				</div>


				<div className="my-4 border-2 flex justify-between ">
					<p className="text-3xl basis-1/6 text-center">🚍</p>
					<div className="grow flex flex-col">
						<label htmlFor="Name" className="text-gray-400">
							Name
						</label>
						<input
							type="text"
							name="Name"
							value={user.name}
							className="py-2 max-w-100 max-[300px]:w-[90%]"
						/>
					</div>
					<p className="text-3xl basis-1/6 text-center">🖊</p>
				</div>

				<div className="my-4 border-2 flex justify-between ">
					<p className="text-3xl basis-1/6 text-center">🚍</p>
					<div className="grow flex flex-col">
						<label htmlFor="Email" className="text-gray-400">
							Email
						</label>
						<input
							type="text"
							name="Email"
							value={user.email}
							className="py-2 max-w-100 max-[300px]:w-[90%]"
						/>
					</div>
					<p className="text-3xl basis-1/6 text-center">🖊</p>
				</div>

				<div className="my-4 border-2 flex justify-between ">
					<p className="text-3xl basis-1/6 text-center">🚍</p>
					<div className="grow flex flex-col">
						<label htmlFor="Phone" className="text-gray-400">
							Phone
						</label>
						<input
							type="text"
							name="Phone"
							value={user.phone}
							className="py-2 max-w-100 max-[300px]:w-[90%]"
						/>
					</div>
					<p className="text-3xl basis-1/6 text-center">🖊</p>
				</div>
			</form>

			<form>
				<p>-Change Password?-</p>
				<div className="my-4 border-2 flex justify-between ">
					<p className="text-3xl basis-1/6 text-center">🚍</p>
					<div className="grow flex flex-col">
						<label htmlFor="Password" className="text-gray-400">
							Password
						</label>
						<input
							type="text"
							name="Password"
							defaultValue={"********"}
                            placeholder="Input a new password"
							className="py-2 max-w-100 max-[300px]:w-[90%]"
						/>
					</div>
					<p className="text-3xl basis-1/6 text-center">🖊</p>
				</div>
			</form>
		</div>
	);
};

export default MainProfile;
