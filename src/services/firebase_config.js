// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(firebase);

export {fireStore};

//아 못해먹겠다
// https://velog.io/@sorious77/React-SubwayTour-1.-Firebase-%EC%97%B0%EB%8F%99