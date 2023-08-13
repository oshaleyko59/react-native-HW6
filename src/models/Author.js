export default class Author {
	constructor( name, avatarUrl) {
		this.name = name;
		this.avatar = avatarUrl;
    this.dtJoined = Date.now();
    this.posts = {};
	}
}
