import { MainContactsConnections } from "./MainContactsConnections";
import { MainContactsRequests } from "./MainContactsRequests";
import { MainContactsAddContact } from "./MainContactsAddContact";
import React, { useState, useRef, useEffect } from "react";

import { db } from "../App.jsx";
import { collection, query, orderBy, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MainContacts = ({ isUser }) => {

    
	const userDataCollection = collection(db, 'users');
	const userDataQuery = query(userDataCollection);
	const [userData] = useCollectionData(userDataQuery)

    useEffect(()=>{},[userData])

	return (
		<div>
			<MainContactsRequests isUser={isUser} userData={userData}/>

			<MainContactsAddContact isUser={isUser} userData={userData}/>

			<MainContactsConnections isUser={isUser} userData={userData}/>
		</div>
	);
};

export default MainContacts;
