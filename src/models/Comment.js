import uuid from "react-native-uuid";

export default class Comment {
	constructor(text, authorEmail, dtStamp) {
		this.text = text;
		this.authorEmail = authorEmail;
		this.dtStamp = dtStamp ?? Date.now();
		this.id = uuid.v4();
	}
}
