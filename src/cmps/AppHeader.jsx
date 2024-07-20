import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <>
            <div className="header-upper full content-grid p-block-2">
                <div className="header-logo">Mister Toys</div>
            </div>
            <nav className="header-nav-links full content-grid p-block-1">
                <div className="links-container">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/about" >About</NavLink>
                </div>
            </nav>
        </>
    )
}