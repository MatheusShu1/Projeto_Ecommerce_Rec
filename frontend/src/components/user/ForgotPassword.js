import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();


    const { error, loading, message } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success('Senha Enviada ao seu E-mail, acesse o login para utilizar a nova senha após alterar!');

        }
    }, [dispatch, error, message]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData));
    };

    return (
        <Fragment>
            <MetaData title={'Esqueci a senha'} />
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className='mt-2 mb-5'>Esqueci a senha</h1>
                        <div className='form-group'>
                            <label htmlFor='email_field'>Email</label>
                            <input
                                type='email'
                                id='email_field'
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id='forgot_password_button'
                            type='submit'
                            className='btn btn-block py-3'
                            disabled={loading ? true : false}
                        >
                            Enviar
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )

}

export default ForgotPassword;