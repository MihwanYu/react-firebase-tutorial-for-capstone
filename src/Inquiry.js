
import {readIdOnStore, readQueryOnStore} from "./Firebase";


  
export default async(inquireID)=>{
    console.log('read id: ', inquireID);
    // const result = []; //여기에 삽입 데이터 넣어야 함
    
    return readIdOnStore(inquireID);
};
