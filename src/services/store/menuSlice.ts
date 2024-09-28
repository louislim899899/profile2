import { createSlice } from "@reduxjs/toolkit";
import toggleMenu, {hideMenu} from "@/services/reducers/menu/menuReducer"

const menuSlice = createSlice({
    name: 'menu',
    initialState: { isMenuOpen: false }, // can add multiple initial state variable
    reducers: { // can add multiple function
        toggleMenu,
        hideMenu
    }
})

// const openMenu = (dispatch, getState) => {
//     return (dispatch: any) => {
//         dispatch(menuActions.toggleMenu())
//     }
// }

// const toggleMenu = (isMenuOpen: boolean) => {
//     return (dispatch: any) => {
//         dispatch(menuActions.toggleMenu())

         
//     }
//     try await toggleMenu()
// }

export const menuActions = menuSlice.actions;
export default menuSlice