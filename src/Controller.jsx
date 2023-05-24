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

		return data.requests;
	} catch (err) {
		console.error(err);
		console.log("An error occured while fetching user data");
	}
};

export const sendFriendRequest = async (email, ownDetails) => {
	if (!email) return "Please input your email.";
	if (!ownDetails) return "Please log in.";
	if (email == ownDetails.email) return "Can't input your own email.";
	const q = await query(collection(db, "users"), where("email", "==", email));
	const docz = await getDocs(q);
	if (docz.docs[0]?.data()) {
		console.log(docz.docs[0].data());
		console.log("user found = > adding request");
		let docID = docz.docs[0]?.id;
		let data2 = docz.docs[0].data();

		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 7);

		const updatedRequests = [
			...data2.requests,
			{
				name: ownDetails.displayName,
				photo: ownDetails.photoURL,
				email: ownDetails.email,
				expiry: expiryDate,
			},
		];

		const isEmailAlreadyExists = data2.requests.some(
			(request) => request.email === ownDetails.email,
		);

		if (isEmailAlreadyExists) {
			console.log("Email already exists in requests");
			return "Email already exists in requests";
		}

		const docRef = await doc(db, "users", docID);
		await updateDoc(docRef, {
			requests: updatedRequests,
		});
		console.log("Request sent!");
		return "Request sent!";
	} else {
		return "User not found!";
	}
};

export const grabConnections = async (ownEmail) => {
	if (!ownEmail) return;
	try {
        const q = query(collection(db, 'users'), where('email', '==', ownEmail));
        const doc = await getDocs(q);
        const userData = doc.docs[0].data();
    
        if (userData.friends.length < 1) return 'No connections.';
    
        const grabAndTransformReferences = userData.friends.map(async (friendRef) => {
          const documentSnapshot = await getDoc(friendRef);
          if (documentSnapshot.exists()) {
            const friendData = documentSnapshot.data();
            // Perform any necessary transformations on friendData
            return friendData;
          } else {
            console.log('Friend document does not exist');
            return null;
          }
        });
    
        const transformedConnections = await Promise.all(grabAndTransformReferences);
    
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
	console.log("acceptFriendRequest");
};

export const rejectFriendRequest = async (ownEmail, targetEmail) => {
	if (!ownEmail || !targetEmail || ownEmail === targetEmail)
		return "Something is not quite right. Please refresh the page.";

	const q = await query(
		collection(db, "users"),
		where("email", "==", ownEmail),
	);
	const docz = await getDocs(q);

	if (docz.docs[0]?.data()) {
		console.log(docz.docs[0].data());
		console.log("user found = > removing/rejecting request");
		let docID = docz.docs[0]?.id;
		let data2 = docz.docs[0].data();

		const updatedStudents = data2.requests.filter(
			(email) => email.email !== targetEmail,
		);

		const docRef = await doc(db, "users", docID);
		await updateDoc(docRef, {
			requests: updatedStudents,
		});
		console.log("Request rejected!");
		return "Request rejected!";
	} else {
		return "User not found!";
	}
};