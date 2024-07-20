import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { About } from './pages/About.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'

import './assets/style/main.css'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="app content-grid">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/toy/:toyId" element={<ToyDetails />} />
                        <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                        <Route path="/toy/edit" element={<ToyEdit />} />
                        <Route path="/toy" element={<ToyIndex />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    )
}