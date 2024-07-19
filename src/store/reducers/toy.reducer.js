import { toyService } from '../../services/toy.service.js'

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const UNDO_TOYS = 'UNDO_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: {},
    lastToys: {},
    isLoading: true,
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
                toys: {
                    ...state.toys,
                    filteredToys: [state.toys.filteredToys.filter(toy => toy._id !== cmd.toyId)]
                },
                lastToys: { ...state.toys }
            }
        case ADD_TOY:
            return {
                ...state,
                toys: {
                    ...state.toys,
                    filteredToys: [...state.toys.filteredToys, cmd.toy]
                },
                lastToys: { ...state.toys }
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: {
                    ...state.toys,
                    filteredToys: [state.toys.filteredToys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)]
                },
                lastToys: { ...state.toys }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case UNDO_TOYS:
            return {
                ...state,
                toys: { ...state.lastToys }
            }

        default:
            return state
    }
}
