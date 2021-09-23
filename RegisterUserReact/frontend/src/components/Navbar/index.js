import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand">React Web-site</a>
                    <button className="navbar-toggler" data-bs-target="#mainMenu" data-bs-toggle="collapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mainMenu">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Головна сторінка</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Реєстрація</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
