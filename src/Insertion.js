
import {insertOnStore} from "./Firebase";


  
export default async(insertObj)=>{
    console.log('insertObj: ', insertObj);
    // const result = []; //여기에 삽입 데이터 넣어야 함
    const data = {keyword:[{word: "banana", timelist: [30, 89, 115]},
                            {word: "apple", timelist: [50, 79, 155]},
                            {word: "banana", timelist: [100, 129, 435]}],
                  url: "bananamonkey"};
    insertOnStore(insertObj);
};
