import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'

import { loadToys } from '../store/actions/toy.actions.js'
import { SET_IS_LOADING } from '../store/reducers/toy.reducer.js'
import { ToyFilterAndSort } from '../cmps/ToyFilterAndSort.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { ColoredSentence } from '../cmps/ColoredSentence.jsx'
import { Loader } from '../cmps/Loader.jsx'

export function ToyIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()
    const toys = useSelector(state => state.toyModule.toys)
    const isLoading = useSelector(state => state.toyModule.isLoading)
    const [queryParams, setQueryParams] = useState(toyService.getQueryParams(searchParams))

    useEffect(() => {
        dispatch({ type: SET_IS_LOADING, isLoading: true })
        setSearchParams(queryParams)
        loadToys(queryParams)
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot load toys')
            })
            .finally(() => dispatch({ type: SET_IS_LOADING, isLoading: false }))
    }, [queryParams])

    function onAddToy() {

    }

    function onSetQueryParams(queryParams) {
        setQueryParams(queryParams)
    }

    return (
        <>
            <ToyFilterAndSort queryParams={queryParams} onSetQueryParams={onSetQueryParams} />
            <h2 className="m-top-1"><ColoredSentence>What toy would like to play with today?</ColoredSentence></h2>
            <Link to="/toy/edit" className="btn no-stretch m-top-1">Add Toy</Link>
            {isLoading
                ? <Loader />
                : <ToyList toys={toys} />
            }
        </>
    )
}