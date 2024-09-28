import { createSlice } from "@reduxjs/toolkit";
import { changeTransition } from "@/services/reducers/animation/transitionReducer"

const transitionSlice = createSlice({
    name: 'transition',
    initialState: { transition: 'fade-in' }, // can add multiple initial state variable
    reducers: { // can add multiple function
        changeTransition
    }
})

export const transitionActions = transitionSlice.actions;
export default transitionSlice