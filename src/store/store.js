import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { itemReducer } from './reducers/item.reducer.js'

const rootReducer = combineReducers({
    itemModule: itemReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

// for DEBUGGING
// window.gStore = store
