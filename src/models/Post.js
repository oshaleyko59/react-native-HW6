import uuid from "react-native-uuid";

export default class Post {
	constructor(author, title, place, location, pictureUri) {
		this.author = author;
		this.title = title;
		this.pictureUri = pictureUri;
		this.place = place;
		this.location = location; // { lat: 0.141241, lng: 127.121 }
		this.comments = [];
    this.likes = [];
    this.dtStamp = Date.now();
		this.id = uuid.v4();
	}
}
