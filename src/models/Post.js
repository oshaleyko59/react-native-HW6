

export default class Post {
	constructor(uid, title, place, location, url) {
    this.authorId = uid;
		this.title = title;
		this.picture = url;
		this.place = place;
		this.location = location; // { lat: 0.141241, lng: 127.121 }
    this.dtCreated = Date.now();
    this.likesCount = 0;
    this.likes = {}; //list of objects {uid: true}
    this.commentsCount = 0;
    this.comments = {}; // list of Comment objects
	}
}
