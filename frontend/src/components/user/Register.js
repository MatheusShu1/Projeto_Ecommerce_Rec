import React, { useState, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const Register = ({ match }) => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = user;

    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
            window.location.reload();
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            console.error('Por favor, preencha todos os campos');
            return;
        }

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);

        dispatch(register(formData));
    };

    const onChangeName = (e) => {
        setUser({ ...user, name: e.target.value });
    };

    const onChangeEmail = (e) => {
        setUser({ ...user, email: e.target.value });
    };

    const onChangePassword = (e) => {
        setUser({ ...user, password: e.target.value });
    };

    return (
        <>
            <MetaData title={'Registro de Usuario'} />
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className='mb-3'>Registro</h1>
                        <div className='form-group'>
                            <label htmlFor='name_field'>Nome</label>
                            <input
                                type='text'
                                id='name_field'
                                className='form-control'
                                value={name}
                                onChange={onChangeName}
                            />
                            <label htmlFor='email_field'>Email</label>
                            <input
                                type='email'
                                id='email_field'
                                className='form-control'
                                value={email}
                                onChange={onChangeEmail}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password_field'>Senha</label>
                            <input
                                type='password'
                                id='password_field'
                                className='form-control'
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <div className='form-group'>
                            <button
                                className='btn btn-primary btn-block py-2'
                                type='submit'
                                disabled={loading ? true : false}
                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
