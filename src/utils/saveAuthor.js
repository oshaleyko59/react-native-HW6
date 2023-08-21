import { ref, set } from "firebase/database";

import { db } from "../firebase/config";
import Author from "../models/Author";

export default async function saveAuthor(id, name, avatar) {
  const author = new Author(name, avatar);

	try {
		await set(ref(db, "users/" + id), author);
	} catch (e) {
		console.log("Error @saveAuthor>>", e); //FIXME: handle in component
	}
}
