import { Link } from 'react-router-dom'

import { removeToy } from '../store/actions/toy.actions.js'
import { ToyPreview } from './ToyPreview.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyList({ toys }) {

    function onRemoveToy(toyId) {
        if (!confirm('Are you sure?')) return

        removeToy(toyId)
            .then(() => showSuccessMsg(`Toy removed`))
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot remove toy ' + toyId)
            })
    }

    return (
        <div className="toy-list">
            <ul>
                {toys.filteredToys.map(toy => (
                    < li key={toy._id} >
                        <Link to={`/toy/${toy._id}`}><ToyPreview toy={toy} /></Link>
                        <div className="toy-actions">
                            <button className="btn" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                            <Link to={`/toy/edit/${toy._id}`}><button className="btn">Edit</button></Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}