import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { toyReducer } from './reducers/toy.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

// for DEBUGGING
// window.gStore = store
