import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/loader'
import MetaData from '../layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'

import { login, clearErrors } from '../../actions/userActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ history, location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect)
            window.location.reload();
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        };
    }, [dispatch, isAuthenticated, error, history]);

    const loginHandler = (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={loginHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Senha</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <a href="/password/forgot" className="float-right mb-4">Esqueceu a senha?</a>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    LOGIN
                                </button>

                                <a href="/register" className="float-right mt-3">Novo usuário?</a>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
