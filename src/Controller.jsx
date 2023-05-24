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
	arrayUnion,
} from "firebase/firestore";
import { db, auth } from "./App.jsx";

export const getUser = async (uid) => {
	if (!uid) return;
	try {
		const q = await query(collection(db, "users"), where("uid", "==", uid));
		const doc = await getDocs(q);

		const data = await doc.docs[0].data();
		return data;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};
export const getUserByEmail = async (email) => {
	if (!email) return;
	try {
		const q = await query(collection(db, "users"), where("email", "==", email));
		const docz = await getDocs(q);
		if (!docz.docs[0]?.id) return null;
		const data = await docz.docs[0]?.data();

		return data;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};

export const getRefByEmail = async (email) => {
	if (!email) return;
	try {
		const q = await query(collection(db, "users"), where("email", "==", email));
		const docz = await getDocs(q);
		if (!docz.docs[0]?.id) return null;
		const data = await docz.docs[0]?.id;
		const documentRef = await doc(db, "users", data);

		return documentRef;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};
export const getIdByEmail = async (email) => {
	if (!email) return;
	try {
		const q = await query(collection(db, "users"), where("email", "==", email));
		const docz = await getDocs(q);
		if (!docz.docs[0]?.id) return null;
		const data = await docz.docs[0]?.id;

		return data;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};
export const getUserPhoto = async (email) => {
	if (!email) return;
	try {
		const q = await query(collection(db, "users"), where("email", "==", email));
		const doc = await getDocs(q);
		const data = await doc.docs[0].data();
		if (data.requests.length < 1) return "No requests.";
		console.log(data.photo);
		return data.photo;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};

export const getFriendRequests = async (email) => {
	if (!email) return;
	try {
		const q = await query(collection(db, "users"), where("email", "==", email));
		const doc = await getDocs(q);
		const data = await doc.docs[0].data();
		if (data.requests.length < 1) return "No requests.";

		const requestsData = await Promise.all(
			data.requests.map(async (requestRef) => {
				const requestDoc = await getDoc(requestRef);
				if (requestDoc.exists()) {
					const requestData = requestDoc.data();
					return requestData;
				}
				return null;
			}),
		);

		return requestsData;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};

// add in ownEmail the ref to target email
export const sendFriendRequest = async (ownEmail, targetEmail) => {
	if (!targetEmail) return "Please input your email.";
	if (!ownEmail) return "Please log in.";
	if (targetEmail == ownEmail) return "Can't input your own email.";

	const targetEmailRef = await getRefByEmail(targetEmail);
	if (!targetEmailRef) return "User not found!";
	const targetUserData = await getUserByEmail(targetEmail);
	const targetUserDataID = await getIdByEmail(targetEmail);
	const ownEmailRef = await getRefByEmail(ownEmail);
	const ownUserData = await getUserByEmail(ownEmail);

	// /////////////////////////////////

	const isUserAlreadyAFriend = ownUserData.friends.some(
		(friend) => friend.path === targetEmailRef.path,
	);
	if (isUserAlreadyAFriend) {
		console.log("Email already exists in friends.");
		return "Email already exists in friends.";
	}
	//
	const isAlreadyRequested = targetUserData.requests.some(
		(requests) => requests.path === ownEmailRef.path,
	);
	if (isAlreadyRequested) {
		console.log("Connection already requested.");
		return "Connection already requested.";
	}
	// //
	const expiryDate = new Date();
	expiryDate.setDate(expiryDate.getDate() + 7);

	const updatedRequests = [...targetUserData.requests, ownEmailRef];
	//
	const docRef = await doc(db, "users", targetUserDataID);
	await updateDoc(docRef, {
		requests: updatedRequests,
	});
	console.log("Request sent!");
	return "Request sent!";
};

export const grabConnections = async (ownEmail) => {
	if (!ownEmail) return;
	try {
		const q = query(collection(db, "users"), where("email", "==", ownEmail));
		const doc = await getDocs(q);
		const userData = doc.docs[0].data();

		if (userData.friends.length < 1) return "No connections.";

		const grabAndTransformReferences = userData.friends.map(
			async (friendRef) => {
				const documentSnapshot = await getDoc(friendRef);
				if (documentSnapshot.exists()) {
					const friendData = documentSnapshot.data();
					// Perform any necessary transformations on friendData
					return friendData;
				} else {
					console.log("Friend document does not exist");
					return null;
				}
			},
		);

		const transformedConnections = await Promise.all(
			grabAndTransformReferences,
		);

		const updatedData = {
			...userData,
			friends: transformedConnections,
		};

		return updatedData.friends;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};

export const acceptFriendRequest = async (ownEmail, targetEmail) => {
	if (!ownEmail || !targetEmail || ownEmail === targetEmail)
		return "Something is not quite right. Please refresh the page.";

	const ownUserData = await getUserByEmail(ownEmail);
	const targetEmailRef = await getRefByEmail(targetEmail);

	const q = await query(
		collection(db, "users"),
		where("email", "==", targetEmail),
	);
	const docz = await getDocs(q);
	const targetDoc = docz.docs[0];

	if (targetDoc) {
		const targetDocID = targetDoc.id;

		const q2 = await query(
			collection(db, "users"),
			where("email", "==", ownEmail),
		);
		const docz2 = await getDocs(q2);
		const ownDoc = docz2.docs[0];

		if (ownDoc) {
			const ownDocID = ownDoc.id;
			const ownDocData = ownDoc.data();

			const documentRef = doc(db, "users", targetDocID);
			const updatedFriends = [...ownDocData.friends, documentRef];

			const updatedRequests = ownUserData.requests.filter(
				(req) => req.path !== targetEmailRef.path,
			);
			const docRef = doc(db, "users", ownDocID);
			await updateDoc(docRef, {
				friends: updatedFriends,
				requests: updatedRequests,
			});
			// to add friend into target account too

			console.log("Request accepted!");
			return "Request accepted!";
		} else {
			return "User not found!";
		}
	} else {
		return "Target user not found!";
	}
};

export const rejectFriendRequest = async (ownEmail, targetEmail) => {
	if (!ownEmail || !targetEmail || ownEmail === targetEmail)
		return "Something is not quite right. Please refresh the page.";

	const ownUserData = await getUserByEmail(ownEmail);
	const ownUserDataID = await getIdByEmail(ownEmail);
	console.log(
		"🚀 ~ file: Controller.jsx:250 ~ rejectFriendRequest ~ ownUserDataID:",
		ownUserDataID,
	);
	const targetEmailRef = await getRefByEmail(targetEmail);

	const updatedRequests = ownUserData.requests.filter(
		(req) => req.path !== targetEmailRef.path,
	);
	try {
		const docRef = await doc(db, "users", ownUserDataID);
		await updateDoc(docRef, {
			requests: updatedRequests,
		});
	} catch (error) {
		console.log(error);
	}

	console.log("Request rejected!");
	return "Request rejected!";
};
