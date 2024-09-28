import { PayloadAction } from "@reduxjs/toolkit";

const intialState = {
    transition: "fade-in",
}


export function changeTransition(state: any = intialState, action: PayloadAction<String>) {
    // console.log(action)
    switch(action.payload) {
        case "FADE_IN":
            return {
                ...state, transition: "fade-in"
            }
        case "FADE_OUT": 
            return {
                ...state, transition: "fade-out"
            }
        default:
            return state
    }
}