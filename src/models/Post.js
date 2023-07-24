export default class Post {
	constructor(title, place, location, pictureUri) {
		this.title = title;
		this.pictureUri = pictureUri;
		this.place = place;
		this.location = location; // { lat: 0.141241, lng: 127.121 }
    this.comments = [];
    this.likes = [];
		this.id = Math.random().toString(); //FIXME: add now
	}
}
