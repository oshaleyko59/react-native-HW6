export default class Comment {
	constructor(text, authorId, dtStamp) {
		this.text = text;
		this.authorId = authorId;
		this.dtStamp = dtStamp;
		this.id = Math.random().toString(); //FIXME: add now
	}
}
