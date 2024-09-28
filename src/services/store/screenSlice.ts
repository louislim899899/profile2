import { createSlice } from "@reduxjs/toolkit";
import { initialState, isHomeScreen, notHomeScreen, setCurrentUrl, getDevice } from "@/services/reducers/screen/screenReducer"

const screenSlice = createSlice({
    name: 'screen',
    initialState: initialState, // can add multiple initial state variable
    reducers: { // can add multiple function
        isHomeScreen,
        notHomeScreen,
        setCurrentUrl,
        getDevice,
    }
})

export const screenActions = screenSlice.actions;
export default screenSlice