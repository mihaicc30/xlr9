import React, { useEffect } from "react";
import { app, auth, db } from "../App.jsx";
import { useNavigate } from "react-router-dom";

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	FacebookAuthProvider,
} from "firebase/auth";

import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	where,
	orderBy,
	query,
	addDoc,
	doc,
	updateDoc,
} from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

const Landing = ({ isUser }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isUser) navigate("/chat");
	}, [isUser]);

	if (!isUser) {
		return (
			<div className="flex flex-col justify-between grow">
				<h1 className="text-5xl font-black tracking-[2rem] text-center translate-x-[5%]">
					XLR9
				</h1>
				<SignIn />
			</div>
		);
	}
};

export default Landing;

function SignIn() {
	const signInWithGoogle = async () => {
		try {
			console.log("1");
			const res = await signInWithPopup(auth, googleProvider);
			const user = res.user;
			console.log(user);

			console.log("2");
			// Check if user exists in Firestore
			const q = query(collection(db, "users"), where("uid", "==", user.uid));
			console.log("3");
			const docs = await getDocs(q);
			console.log("4");
			if (docs.docs.length < 1) {
				console.log("5");
				// Add user to Firestore if not already exists
				const newUserRef = await addDoc(collection(db, "users"), {
					uid: user.uid,
					name: user.displayName,
					email: user.email,
					photo: user.photoURL,
					phone: "",
					status: "",
					conversations: [],
					friends: [],
					requests: [],
					groups: [],
					date: new Date(),
				});
				console.log(
					"User does not exists in Firestore. New user added with ID: ",
					newUserRef.id,
				);
			} else {
				console.log("User already exists in Firestore. No updates needed.");
			}
			console.log("Popup is successfull. Proceeding...");
		} catch (error) {
			if (
				error == "FirebaseError: Firebase: Error (auth/popup-closed-by-user)."
			)
				console.log("User closed login popup.");
		}
	};

	return (
		<div className="flex justify-center my-[10vh]">
			<button className="b" onClick={signInWithGoogle}>
				Sign in with Google
			</button>
		</div>
	);
}
