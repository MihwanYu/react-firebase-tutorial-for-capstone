// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

};

//배열을 DB에 저장하는 메서드
const insertOnStore = async (data) => {
  const docRef = await addDoc(collection(fireStore, "test-table"), data);
  console.log(`document written with ID: ${docRef.id}`);

  // const dataRef = doc(fireStore, "station", data);
  // await setDoc(dataRef, { ...data, visited: false });


  // stations.map(async (station) => {
  //   const stationRef = doc(fireStore, "station", station.station_cd);
  //   await setDoc(stationRef, { ...station, visited: false });
  // });
  
};


//DB에서 id값으로 문서 조회하는 메서드
const readIdOnStore = async(id)=>{
  const docRef = doc(fireStore, "test-table", id);
  const docSnap = await getDoc(docRef);
  console.log('read result: ', docSnap.data());
  return docSnap.data();
}

//DB에서 특정 필드 값으로 문서 조회하는 메서드
const readQueryOnStore = async(data)=>{
  const q = query(collection(fireStore, "test-table"), where(data.field, "==", data.value));

  const querySnapshot = await getDocs(q);
  return querySnapshot;

}


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const fireStore = getFirestore(firebase);

export {fireStore, insertOnStore, readIdOnStore, readQueryOnStore};
