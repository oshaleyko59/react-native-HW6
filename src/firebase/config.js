// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення сховища файлів в проект
import { getStorage} from "firebase/storage";
// Функція для підключення бази даних у проект
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDV2mQ5bRj1ddESFKMGmqtLpLxlBPlCQ_8",
	authDomain: "react-native-goit-1b74f.firebaseapp.com",
	databaseURL: "https://react-native-goit-1b74f-default-rtdb.firebaseio.com",
	projectId: "react-native-goit-1b74f",
	storageBucket: "react-native-goit-1b74f.appspot.com",
	messagingSenderId: "387812982277",
	appId: "1:387812982277:web:04b93c27e0d2f097ede66c",
	measurementId: "G-61F5GME815",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storageImages = getStorage(app);
export const db = getDatabase(app);



//const API_KEY = process.env.EXPO_PUBLIC_API_KEY; //NB! it's safe Google says



