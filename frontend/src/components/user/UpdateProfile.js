import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateProfile, clearErrors, loadUser } from '../../actions/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Perfil atualizado com sucesso!');
            dispatch(loadUser());
            history.push('/me');
            window.location.reload();
            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, error, history, isUpdated, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        dispatch(updateProfile(formData));

    };

    return (
        <Fragment>
            <MetaData title={'Atualizar Perfil'} />
            <div className='row wrapper'>
                <div className='col-10 col-lg-5'>
                    <form className='shadow-lg' onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className='mt-2 mb-5'>Atualizar Perfil</h1>
                        <div className='form-group'>
                            <label htmlFor='name_field'>Nome</label>
                            <input
                                type='text'
                                id='name_field'
                                className='form-control'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email_field'>Email</label>
                            <input
                                type='email'
                                id='email_field'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id='update_button'
                            type='submit'
                            className='btn btn-block py-3'
                            disabled={loading ? true : false}
                        >
                            ATUALIZAR
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProfile;