import Landing from "./Components/Landing.jsx";
import Chat from "./Components/Chat.jsx";
import Page404 from "./Components/Page404.jsx";

import React, { useEffect, useState } from "react";
import "./App.css";

import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	Navigate,
	useLocation,
	useNavigation,
	useNavigate,
} from "react-router-dom";

import {
	useCollection,
	useCollectionData,
} from "react-firebase-hooks/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: import.meta.env.VITE_authDomain,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messagingSenderId,
	appId: import.meta.env.VITE_appId,
	measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default function App() {
	const [user, loading, error] = useAuthState(auth);
	if (loading) {
		return (
			<div>
				<p className="text-center">Initialising...</p>
				<div className="flex justify-center items-center">
					<p className="animate-spin origin-center">🕧</p>
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div>
				<p>Error: {error}</p>
			</div>
		);
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout isUser={user} />}>
					<Route path="/" element={<Landing isUser={user} />} />
					<Route path="/chat" element={<Chat isUser={user} />} />
					<Route path="*" element={<Page404 />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

const Layout = ({ isUser }) => {
	return (
		<>
			<Outlet />
		</>
	);
};
