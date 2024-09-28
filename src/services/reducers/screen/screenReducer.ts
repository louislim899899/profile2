import { PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

export const initialState = {
    isHomeScreen: true,
    device: 'desktop',
    currentUrl: "/profile",
}


export function isHomeScreen(state: any = initialState, action: AnyAction) {
    state.isHomeScreen = true   // writing mutable state is allow in createSlice, but normall should write the one like below
    // switch(action.type) {
    //     case "IS_HOME":
    //         return {
    //             ...state, isHomeScreen: true
    //         }
    //     case "NOT_HOME": 
    //         return {
    //             ...state, isHomeScreen: false
    //         }
    //     default:
    //         return state
    // }
}

export function notHomeScreen(state: any, action: AnyAction) {
    state.isHomeScreen = false
}

export function getDevice(state: any = initialState, action: AnyAction) {
    if (window.innerWidth <= 768) {
        state.device = 'mobile';
    } else {
        state.device = 'desktop';
    }

}

// export function currentUrl(state: any, action: AnyAction) {
//     state.currenScreen = action.url
// }

export function setCurrentUrl(state: any, action: PayloadAction<String>) {
    state.currentUrl = action.payload
}