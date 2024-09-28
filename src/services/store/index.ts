import {configureStore} from '@reduxjs/toolkit'
import screenSlice from './screenSlice'
import menuSlice from './menuSlice'
import transitionSlice from './transitionSlice'
// import { combineReducers } from '@reduxjs/toolkit'


// const rootReducer = combineReducers({})




const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        screen: screenSlice.reducer,
        transition: transitionSlice.reducer,
    },
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

