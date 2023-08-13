import { ref, child, get } from "firebase/database";

import { db } from "../firebase/config";

export default async function getPost(id) {
	try {
    const snapshot = await get(child(db, `posts/${id}`));
    if (snapshot.exists()) {
      console.debug("getPost>>", snapshot.val());
      const p = snapshot.val();
      return p;
		} else {
			console.log("No data available");
		}
	} catch (e) {
		console.error("Error @getPost>>", e);
	}
}

/*
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";


const db = getDatabase();
const auth = getAuth();

const userId = auth.currentUser.uid;
return onValue( //???????????????
	ref(db, "/users/" + userId),
	(snapshot) => {
		const username = (snapshot.val() && snapshot.val().username) || "Anonymous";
		// ...
	},
	{
		onlyOnce: true,
	}
); */
