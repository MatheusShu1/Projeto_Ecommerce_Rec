import React, { Fragment } from 'react';
import '../../App.css';
import { Route } from 'react-router-dom';
import Search from './search';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { cartItems } from '../../actions/cartActions';
import { logoutUser } from '../../actions/userActions';

const Header = () => {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth);
    const logoutHandler = () => {
        toast.success('Deslogado com sucesso');
        dispatch(logoutUser());
    }
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand" >
                        <a href="/">
                            <img src="../images/logoMaior2.png" alt="logo principal" />
                        </a>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <a href="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Carrinho</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </a>
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <button className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />
                                </figure>
                                <span>{user && user.name}</span>
                            </button>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role !== 'admin' ? (
                                    <a className="dropdown-item" href="/orders/me">Orders</a>
                                ) : (
                                    <a className="dropdown-item" href="/dashboard">Dashboard</a>
                                )}

                                <a className="dropdown-item" href="/me">Profile</a>
                                <a className="dropdown-item text-danger" href="/" onClick={logoutHandler}>Logout</a>
                            </div>
                        </div>
                    ) : !loading && <a href="/login" className="btn ml-4" id="login_btn">Login</a>}


                </div>
            </nav>
        </Fragment>
    );
}

export default Header;