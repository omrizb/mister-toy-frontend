import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <div className="app-header">
            <h2>Mister Toys</h2>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink> |
                <NavLink to="/toy" >Toys</NavLink>
            </nav>
        </div>
    )
}