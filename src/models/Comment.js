
export default class Comment {
	constructor(text, authorId, avatar) {
		this.text = text;
    this.authorId = authorId;
    this.avatar = avatar;
		this.dtCreated = Date.now();
	}
}
