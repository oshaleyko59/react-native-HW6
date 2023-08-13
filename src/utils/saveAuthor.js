import { ref, set } from "firebase/database";

import { db } from "../firebase/config";
import Author from "../models/Author";

export default async function saveAuthor(id, name, avatar) {
  const author = new Author(name, avatar);
  console.debug("saveAuthor>>", author);
	try {
		await set(ref(db, "users/" + id), author);
		console.log("saveAuthor>>: ", id, author);
	} catch (e) {
		console.error("Error @saveAuthor>>", e);
	}
}
