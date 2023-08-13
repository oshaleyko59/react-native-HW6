import axios from "axios";
import uuid from "react-native-uuid";
import {
	ref,
	uploadBytes,	getDownloadURL,
//	uploadBytesResumable,
} from "firebase/storage";

import { db, storageImages } from "../firebase/config";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

const BASE_URL = "https://react-native-goit-1b74f-default-rtdb.firebaseio.com"; //TODO: ???

export function storePost(postData, uid) {
	axios.post(BASE_URL + "/posts.json", postData);
}

export async function uploadPhotoToFirebaseStorage(photo) {
	try {
		const response = await fetch(photo);
		const file = await response.blob();
		const postId = uuid.v4();
		const imageId = `${postId}.jpg`;
		const refImage = ref(storageImages, imageId);
    //  const uploadTask = uploadBytesResumable(refImage, file);
    const res = await uploadBytes(refImage, file);
    const url = await getDownloadURL(refImage);
    return url;
/* 		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Get task progress-> # bytes uploaded and total # bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				cons ole.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						cons ole.log("Upload is paused");
						break;
					case "running":
						cons ole.log("Upload is running");
						break;
				}
			},
      (error) => {
        cons ole.log("Upload file error:", error.code);
				// A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        //switch (error.code): "storage/unauthorized""storage/unknown""storage/canceled" etc
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					conso le.log("File available at", downloadURL);
				});
			}
    ); */
	} catch (error) {
    console.error("ERROR>>upload", error);
    return null;
	}
}

export async function fetchPosts() {
	const response = await axios.get(BASE_URL + "/posts.json");

	console.debug(response.data);

	const posts = [];
	for (const key in response.data) {
		const postObj = {
			id: key,
			title: response.data[key].title,
			place: response.data[key].place,
			location: response.data[key].location,
			picture: response.data[key].picture,
			comments: response.data[key].comments,
		};
		posts.push(postObj);
	}
	return posts;
}

//uploadPhotoToFirebaseStorage >> FIXME: remove
/* const refImag= {
	_location: {
		bucket: "react-native-goit-1b74f.appspot.com",
		path_: "img.jpg",
	},
	_service: {
		_appCheckProvider: {
			component: null,
			container: [ComponentContainer],
			instances: [Map],
			instancesDeferred: [Map],
			instancesOptions: [Map],
			name: "app-check-internal",
			onInitCallbacks: [Map],
		},
		_appId: null,
		_authProvider: {
			component: [Component],
			container: [ComponentContainer],
			instances: [Map],
			instancesDeferred: [Map],
			instancesOptions: [Map],
			name: "auth-internal",
			onInitCallbacks: [Map],
		},
		_bucket: { bucket: "react-native-goit-1b74f.appspot.com", path_: "" },
		_deleted: false,
		_firebaseVersion: "10.1.0",
		_host: "firebasestorage.googleapis.com",
		_maxOperationRetryTime: 120000,
		_maxUploadRetryTime: 600000,
		_protocol: "https",
		//  "_requests": Set { },
		_url: undefined,
		app: {
			_automaticDataCollectionEnabled: false,
			_config: [Object],
			_container: [ComponentContainer],
			_isDeleted: false,
			_name: "[DEFAULT]",
			_options: [Object],
		},
	},
}; */
