import { utilService } from '../services/util.service.js'

export function ToyPreview({ toy }) {


    return (
        <div className="toy-preview">
            <h3>{toy.name}</h3>
            <h4>{toy.price}$</h4>
            <img src={utilService.generateRandomImageUrl({ minWidth: 600, maxWidth: 800, minHeight: 450, maxHeight: 650 })} />
            <h5 style={{ color: toy.inStock ? 'var(--green-10)' : 'var(--red-10)' }}>{toy.inStock ? 'In stock!' : 'Not in stock'}</h5>
        </div>
    )
}