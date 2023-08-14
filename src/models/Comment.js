
export default class Comment {
	constructor(text, authorId) {
		this.text = text;
		this.authorId = authorId;
		this.dtCreated = Date.now();
	}
}
