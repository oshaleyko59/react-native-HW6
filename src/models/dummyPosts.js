import { LoremIpsum } from "lorem-ipsum";
import Post from "./Post";
import Comment from "./Comment";

/* const dummyGallery = [
	require("./dummyImgs/IMG1.jpg"),
	require("./dummyImgs/IMG2.jpg"),
	require("./dummyImgs/IMG3.jpg"),
	require("./dummyImgs/IMG4.jpg"),
	require("./dummyImgs/IMG5.jpg"),
	require("./dummyImgs/IMG6.jpg"),
  require("./dummyImgs/IMG7.jpg"),
]; */

const dummyFBgallery = [
	"https://firebasestorage.googleapis.com/v0/b/react-native-goit-1b74f.appspot.com/o/IMG1.jpg?alt=media&token=13d7f29b-c99a-4c13-ba33-ae6e82d66f6b",
	"https://firebasestorage.googleapis.com/v0/b/react-native-goit-1b74f.appspot.com/o/IMG2.jpg?alt=media&token=1f786c95-1d56-4602-922f-23f79b3ebb95",
/* 	"https://firebasestorage.googleapis.com/v0/b/react-native-goit-1b74f.appspot.com/o/IMG3.jpg?alt=media&token=ba6814c7-6bf9-435d-aa8e-950bb9d022b5",
	"https://firebasestorage.googleapis.com/v0/b/react-native-goit-1b74f.appspot.com/o/IMG4.jpg?alt=media&token=65e2392e-7ca9-4c26-a5d8-d9c15dbcb6cb",
	"https://firebasestorage.googleapis.com/v0/b/react-native-goit-1b74f.appspot.com/o/IMG5.jpg?alt=media&token=4aed4bc3-7b10-4c13-984a-782de4942a9d",
	"https://firebasestorage.googleapis.com/v0/b/react-native-goit-1b74f.appspot.com/o/IMG6.jpg?alt=media&token=270ef939-79d8-4dcb-9bd5-aa7fd83109c3",
	"https://firebasestorage.googleapis.com/v0/b/react-native-goit-1b74f.appspot.com/o/IMG7.jpg?alt=media&token=2b9f731c-d1a4-4d39-a7bd-72aadc47022d",
 */];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const dummyPosts = [];
  (() => {
  for (i = 0; i < dummyFBgallery.length; i = i + 1) {
		const location = { lat: 37 + Math.random(), lng: -120 + Math.random() };
		dummyPosts[i] = new Post(
			"iKyQuNf34OR95V0sLiYiULWW4Lp1",
			lorem.generateWords(1),
			lorem.generateWords(2),
			location,
			dummyFBgallery[i]
		);
	}
    for (i = 0; i < 3; i = i + 1){
      let date = new Date(Date.UTC(2023, 6, 12, 11+i, 1, 59));

      dummyPosts[0].comments[i] = new Comment(lorem.generateSentences(1), (i === 1)?"buniadir@gmail.com":"test@gmail.com", date);
    }
})();

console.log("dummyPosts[0]>>", dummyPosts[0].comments.length);
export default dummyPosts;
