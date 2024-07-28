import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'

import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { Loader } from '../cmps/Loader.jsx'


export function ToyEdit() {

    const navigate = useNavigate()
    const params = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [isLoading, setIsLoading] = useState(true)
    const labels = useRef(toyService.getLabels())

    useEffect(() => {
        if (params.toyId) loadToy()
        else setIsLoading(false)
    }, [])

    function loadToy() {
        toyService.get(params.toyId)
            .then(setToyToEdit)
            .catch(err => console.error('Error:', err))
            .finally(() => setIsLoading(false))
    }


    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(savedToy => {
                navigate('/toy')
                showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
                console.error('Error:', err)
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.type === 'number') value = +target.value || ''
        if (target.type === 'checkbox') value = target.checked
        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function handleLabelChange({ target }) {
        const currLabel = target.name
        const newLabels = toyToEdit.labels.includes(currLabel)
            ? toyToEdit.labels.filter(label => label !== currLabel)
            : [...toyToEdit.labels, currLabel]
        setToyToEdit(prevToyToEdit => ({
            ...prevToyToEdit,
            labels: newLabels
        }))
    }

    return (
        <div className="toy-edit">
            {isLoading
                ? <Loader />
                : <form onSubmit={onSaveToy} >
                    <label>
                        Name:
                        <input onChange={handleChange} value={toyToEdit.name} type="text" name="name" />
                    </label>
                    <label>
                        Price:
                        <input onChange={handleChange} value={toyToEdit.price} type="number" name="price" />
                    </label>
                    <label>
                        In stock:
                        <input onChange={handleChange} checked={toyToEdit.inStock} type="checkbox" name="inStock" />
                    </label>
                    <ul>
                        {labels.current.map(label => (
                            <li key={label}>
                                <input
                                    onChange={handleLabelChange}
                                    checked={toyToEdit.labels.includes(label)}
                                    type="checkbox"
                                    name={label}
                                />
                                {label}
                            </li>
                        ))}
                    </ul>
                    <button className="btn">Save</button>
                </form>
            }
        </div>
    )
}