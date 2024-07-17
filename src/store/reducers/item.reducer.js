import { itemService } from '../../services/item.template.service.js'

export const SET_ITEMS = 'SET_ITEMS'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const UPDATE_ITEM = 'UPDATE_ITEM'
export const UNDO_ITEMS = 'UNDO_ITEMS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS'

const initialState = {
    items: [],
    lastItems: [],
    isLoading: false,
    queryParams: itemService.getDefaultQueryParams(),
}

export function itemReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_ITEMS:
            return {
                ...state,
                items: cmd.items
            }
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== cmd.itemId),
                lastItems: [...state.items]
            }
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, cmd.item]
            }
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item => item._id === cmd.item._id ? cmd.item : item)
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case UNDO_ITEMS:
            return {
                ...state,
                items: [...state.lastItems]
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
