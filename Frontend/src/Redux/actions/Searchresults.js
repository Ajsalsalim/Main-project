import { createSlice} from "@reduxjs/toolkit";
const searchResults= createSlice({
        name:"search",
        initialState: {
            result: [],
          },
          reducers:{
            workerResult:(state,action)=>{
                console.log(action.payload);
                const result = action.payload
                console.log(result);
                state.result=result
            }

          }

})
export const {workerResult} = searchResults.actions
export default searchResults.reducer