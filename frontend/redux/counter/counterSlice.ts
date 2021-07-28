import { createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../store";

interface IInitialState{
    counter: number
}
const initialState: IInitialState = {
    counter: 0
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers : {
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
        reset: (state) => {
            state.counter = 0
        }
    }
});

//export regular actions
export const { increment, decrement, reset } = counterSlice.actions;

//export selectors
export const selectCounter = (state: RootState) => state.counterState.counter;
//export selectors with parameter
// export const whatToSelect = (parameter: any) => (state: RootState) => {
//     //return something 
// }

//export thunks
// export const myThunk = ( parameter: any ):AppThunk => (dispatch, getState) => {
//     const rootState = getState()
//     dispatch(<action_name>())
// }

export default counterSlice.reducer;