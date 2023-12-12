import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updatePassword, clearErrors, loadUser } from '../../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';


const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {


        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Senha atualizada com sucesso!');
            dispatch(loadUser());
            history.push('/me');
            window.location.reload();
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, history, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        dispatch(updatePassword(formData));
    };
    return (
        <Fragment>
            <MetaData title={'Atualizar Senha'} />
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className='mt-2 mb-5'>Atualizar Senha</h1>
                        <div className='form-group'>
                            <label htmlFor='old_password_field'>Senha Antiga</label>
                            <input
                                type='password'
                                id='old_password_field'
                                className='form-control'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='new_password_field'>Senha Nova</label>
                            <input
                                type='password'
                                id='new_password_field'
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type='submit' className='btn update-btn btn-block mt-4 mb-3' disabled={loading ? true : false} >Atualizar Senha</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
};

export default UpdatePassword;