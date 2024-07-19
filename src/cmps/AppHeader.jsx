import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <div className="app-header full content-grid p-block-1">
            <div className="header-container">
                <div className="header-logo">Mister Toys</div>
                <nav className="nav-links">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                </nav>
            </div>
        </div>
    )
}