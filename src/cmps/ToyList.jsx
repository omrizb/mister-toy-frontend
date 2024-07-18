export function ToyList({ toys, onRemoveToy }) {
    return (
        <div className="toy-list">
            <ul>
                {toys.filteredToys.map(toy => (
                    <li key={toy._id}>
                        {toy.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}