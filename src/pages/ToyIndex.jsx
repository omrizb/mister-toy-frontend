import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'

import { loadToys } from '../store/actions/toy.actions.js'
import { SET_IS_LOADING, SET_QUERY_PARAMS } from '../store/reducers/toy.reducer.js'
import { ToyList } from '../cmps/ToyList.jsx'

export function ToyIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()
    const toys = useSelector(state => state.toyModule.toys)
    const isLoading = useSelector(state => state.toyModule.isLoading)
    const queryParams = useSelector(state => state.toyModule.queryParams)

    useEffect(() => {
        dispatch({ type: SET_QUERY_PARAMS, queryParams: toyService.getQueryParams(searchParams) })
    }, [])

    useEffect(() => {
        dispatch({ type: SET_IS_LOADING, isLoading: true })
        setSearchParams(queryParams)
        loadToys()
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot load toys')
            })
            .finally(() => dispatch({ type: SET_IS_LOADING, isLoading: false }))
    }, [queryParams])

    function onRemoveToy() {
        // TODO
    }


    return (
        <div className="todo-index">
            <h2>Toys List</h2>
            {isLoading
                ? <div>Loading...</div>
                : <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            }
        </div>
    )
}