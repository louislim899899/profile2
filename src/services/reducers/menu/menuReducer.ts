import { AnyAction } from "redux";

export default function toggleMenu(state: any, action: AnyAction) {
    state.isMenuOpen = !state.isMenuOpen
}

export function hideMenu(state: any, action: AnyAction) {
    state.isMenuOpen = false
}