import React, { Fragment } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';

const Header = () => {
    let history = useHistory();
    const handleLogout = evt => {
        logout(() => {
            history.push('/signin');
        });
    }
    // views
    const showNavigation = () => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="navbar-brand">Logo</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to='/' className="nav-link"><i className='fas fa-home' /> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/signup' className="nav-link"><i className='fas fa-edit' /> Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/signin' className="nav-link"><i className='fas fa-sign-in-alt' /> Signin</Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && isAuthenticated().role === 1 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to='/admin/dashboard' className="nav-link"><i className='fas fa-home' /> Dashboard</Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && isAuthenticated().role === 0 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link to='/user/dashboard' className="nav-link"><i className='fas fa-home' /> Dashboard</Link>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <button className="btn btn-link text-secondary text-decoration-none pl-0" onClick={handleLogout}><i className='fas fa-sign-out-alt' /> Logout</button>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>    
    )
    // render
    return (
        <header id='header'>
            { showNavigation() }
        </header>
    );
};

export default withRouter(Header);