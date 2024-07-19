import { useRef, useState } from 'react'
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'

import { utilService } from '../services/util.service.js'

export function ToyFilterAndSort({ queryParams, onSetQueryParams }) {

    const [queryParamsToEdit, setQueryParamsToEdit] = useState(queryParams)
    const debouncedOnSetQueryParams = useRef(utilService.debounce(onSetQueryParams, 500))

    useEffectOnUpdate(() => {
        debouncedOnSetQueryParams.current(queryParamsToEdit)
    }, [queryParamsToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked ? 'true' : 'all'
                break

            default: break
        }

        setQueryParamsToEdit(prevQueryParams => ({ ...prevQueryParams, [field]: value }))
    }

    const { txt, minPrice, maxPrice, inStock } = queryParamsToEdit
    return (
        <div className="toy-filter-and-sort full content-grid p-block-1">
            <div className="filter flex align-center g-3">
                <input
                    className="input-big"
                    name="txt"
                    value={txt}
                    onChange={handleChange}
                    placeholder="Search..."
                />
                <h4>Price range:</h4>
                <input
                    className="input-small"
                    name="minPrice"
                    type="number"
                    value={minPrice}
                    onChange={handleChange}
                    placeholder="From..."
                />
                <input
                    className="input-small"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={handleChange}
                    placeholder="To..."
                />
                <label className="flex align-center g-1">
                    <input
                        type="checkbox"
                        name="inStock"
                        value={queryParams.inStock === 'true' ? true : false}
                        onChange={handleChange}
                    />
                    In stock only
                </label>
            </div>
        </div>
    )
}