import uuid from "react-native-uuid";
import {
	ref,
	uploadBytes,	getDownloadURL,
} from "firebase/storage";

import {storageImages } from "../firebase/config";

export async function uploadPhoto(photo) {
	try {
		const response = await fetch(photo);
		const file = await response.blob();

		const imageId = `${uuid.v4()}.jpg`;
		const refImage = ref(storageImages, imageId);

    await uploadBytes(refImage, file);
    const url = await getDownloadURL(refImage);
    return url;

	} catch (error) {
    console.error("ERROR>>upload", error);
    return null;
	}
}

/* TODO: monitor progress ???
//  const uploadTask = uploadBytesResumable(refImage, file);
	// Listen for state changes, errors, and completion of the upload.
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
