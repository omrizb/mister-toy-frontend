import { toyService } from '../../services/toy.service.js'

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const UNDO_TOYS = 'UNDO_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS'

const initialState = {
    toys: [],
    lastToys: [],
    isLoading: false,
    queryParams: toyService.getDefaultQueryParams(),
}

export function toyReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
            }
        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
                lastToys: [...state.toys]
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case UNDO_TOYS:
            return {
                ...state,
                toys: [...state.lastToys]
            }

        case SET_QUERY_PARAMS:
            return {
                ...state,
                queryParams: { ...cmd.queryParams }
            }

        default:
            return state
    }
}
