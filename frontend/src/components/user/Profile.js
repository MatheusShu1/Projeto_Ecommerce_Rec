import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'
const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Meu Perfil'} />
                    <h2 className="mt-5 ml-5">Meu Perfil</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar?.url} alt={user.name} />
                            </figure>
                            <a href="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Editar Perfil
                            </a>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Nome Completo</h4>
                            <p>{user.name}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Membro desde</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <a href="/orders/me" className="btn btn-danger btn-block mt-5">
                                    Meus Pedidos
                                </a>
                            )}

                            <a href="/password/update" className="btn btn-primary btn-block mt-3">
                                Mudar Senha
                            </a>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
