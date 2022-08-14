import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import {fireStore, readQueryOnStore, readIdOnStore} from "./Firebase";
import Insertion from "./Insertion";
import Inquiry from "./Inquiry";

function App() {
  const [insertObj, setInsertObj] = useState(null);

  useEffect(() => {
    console.log(fireStore);
    const url = document.getElementsByClassName('currentUrl')[0].textContent;
    const key = document.getElementsByClassName('currentKey')[0].textContent;
    const time = document.getElementsByClassName('currentTime')[0].textContent;

    const data = {keyword:[{word: key, timelist: [time]}],
                  url: url};
    console.log('삽입될 데이터: ',data);
    setInsertObj(data);
  }, []);

  const dataInsert = async() =>{
    //Insertion() 리턴값으로 Promise 객체 반환되는데 뭔지 모르겠당
    const insertPro = Insertion(insertObj);
    console.log('insert completed: ',insertPro);
  }

  const dataInquire = async()=>{
    // ID가지고 문서 읽는거
    // const inquireRes = Inquiry("ksA0iBkMSoSBqp7HOSKv");
    // const inquireRes = readIdOnStore("ksA0iBkMSoSBqp7HOSKv");
    // console.log('inquire completed: ', inquireRes);

    //value값 가지고 문서 읽는거
    const querySnapshot = await readQueryOnStore({field: "url", value: "www.bts.com"});
    console.log("return type: ",typeof(querySnapshot));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

  }

  const dataInquire2 = ()=>{
    console.log("inquire now:");
    new Promise((resolve, reject)=>{
      const readRes = readQueryOnStore({field: "url", value: "www.bts.com"});
      resolve(readRes);
      console.log("resolve completed");
    })
    .then((result)=>{
      console.log("inquire result: ", result);
    })
    .catch((result)=>{
      console.log("inquire err: ", result);
    })
  }

  return(
    <div className="App">
      <Container>
        {fireStore._databaseId.projectId}
        <div>
          <p>inputData</p>
          <p className="currentUrl">www.bts.com</p>
          <p className="currentKey">방탄소년단</p>
          <p className="currentTime">7:50</p>
        </div>
        <button onClick={dataInsert}>삽입</button>
        <button onClick={dataInquire}>조회</button>
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`
