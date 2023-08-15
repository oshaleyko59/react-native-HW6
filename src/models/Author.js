export default class Author {
	constructor( name, avatarUrl) {
		this.name = name;
		this.avatar = avatarUrl;
    this.dtJoined = Date.now();
    this.posts= {}; //own posts
    //TODO://posts to see (like followed,recommended etc )
    //this.postsStrip = {};
	}
}
