import { Link } from 'react-router-dom'

import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {
    return (
        <div className="toy-list">
            <ul>
                {toys.filteredToys.map(toy => (
                    <li key={toy._id}>
                        <Link to={`/toy/${toy._id}`}><ToyPreview toy={toy} /></Link>
                        <div className="toy-actions">
                            <button>Remove</button>
                            <button>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}