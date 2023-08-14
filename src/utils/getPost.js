import { ref, child, get, onValue } from "firebase/database";

import { db } from "../firebase/config";

export default async function getPost(id, posts) {
	console.debug("getPost>>id", id);
	const postRef = ref(db, "posts/" + id);
	onValue(postRef, (snapshot) => {
  const data = snapshot.val();
   // console.debug("getPost>>data", data);
    posts.push({ id, ...data });
  console.debug("getPost>>posts", posts.length);
});
}

