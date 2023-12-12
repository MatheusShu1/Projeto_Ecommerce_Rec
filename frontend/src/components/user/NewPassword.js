import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const NewPassword = ({ match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();


    const { error, success } = useSelector((state) => state.forgotPassword);

    useEffect(() => {


        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {

            toast.success('Senha atualizada com sucesso!');
            history.push('/login');
            window.location.reload();
        }
    }, [dispatch, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(match.params.token, formData));
    }
    return (
        <Fragment>
            <MetaData title={'Nova Senha'} />
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className='mt-2 mb-5'>Nova Senha</h1>
                        <div className='form-group'>
                            <label htmlFor='password_field'>Senha</label>
                            <input
                                type='password'
                                id='password_field'
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='confirm_password_field'>Confirme a Senha</label>
                            <input
                                type='password'
                                id='confirm_password_field'
                                className='form-control'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id='new_password_button'
                            type='submit'
                            className='btn btn-block py-3'
                        >
                            Definir Senha
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewPassword
