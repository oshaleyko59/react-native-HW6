import axios from "axios";

const BASE_URL = "https://react-native-goit-1b74f-default-rtdb.firebaseio.com";

export function storePost(postData) {
  axios.post(
    BASE_URL+"/posts.json",
    postData);
}

export async function  fetchPosts() {
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

