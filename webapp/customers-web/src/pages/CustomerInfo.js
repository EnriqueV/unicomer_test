import './CustomerInfo.scss';
import { useNavigate, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import CustomerService from '../services/CustomerService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function CustomerInfo() {
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const { id } = useParams();
    const [editing, setEditing] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        cellPhone: '',
        lastName: '',
        address: '',
        incomes: '',
        gender: 0,
        profession: ''
    });

    useEffect(() => {
        getCustomer()
    })

    const getCustomer = async () => {
        CustomerService.getById(id).then(res => {
            setCustomerInfo(res.data)
        });
    }

    const edit = (event) => {
        event.preventDefault();

        setFormData({
            firstName: customerInfo.firstName,
            cellPhone: customerInfo.cellPhone,
            lastName: customerInfo.lastName,
            address: customerInfo.address,
            incomes: customerInfo.incomes,
            gender: customerInfo.gender,
            profession: customerInfo.profession
        })

        let isEditing = !editing;

        setEditing(isEditing);
    }

    const cancelEdit = (event) => {
        event.preventDefault();

        setEditing(false);
    }

    const onUpdate = (event) => {
        event.preventDefault();

        if (formData.address === '' || formData.incomes === ''
        || formData.gender === '' || formData.lastName === ''
        || formData.firstName === '' || formData.cellPhone === '' || formData.profession === '') {
            toast.error('Debes llenar todos los campos', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return
        }

        CustomerService.updateCustomer(id, formData).then(response => {
            toast.success('Cliente actualizado', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setFormData({
                    firstName: '',
                    cellPhone: '',
                    lastName: '',
                    address: '',
                    incomes: '',
                    profession: '',
                    gender: '',
                });
                navigate('/', { replace: true });
            }, err => {
                toast.error('Error al actualizar cliente', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const onDelete = (event) => {
        event.preventDefault();

        MySwal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.value) {
                CustomerService.deleteCustomer(id).then(res => {
                    toast.success('Cliente eliminado', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        navigate('/', { replace: true });
                }, err => {
                    toast.error('Error al eliminar cliente', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                })
            }
        })
    }

    return (
        <>
            <header>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex flex-row justify-content-start align-items-center">
                        <Link className="btn btn-info mx-2" to="/">Atrás</Link>
                        <p>Ver información</p>
                    </div>
                </div>
            </div>
        </header>

        <div className="container p-2">
            <div className="row">
                <div className="col-12 d-flex justify-content-center mt-5 info-title">
                    <p>Información del cliente</p>
                </div>
            </div>

            {
                editing ? 
                (<div className="row">
                <div className="col-12 d-flex justify-content-center mt-5">
                    <form onSubmit={onUpdate}>

                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    value={formData.firstName}
                                    placeholder="Nombre" 
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="lastname">Apellido</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="lastname" 
                                    value={formData.lastName}
                                    placeholder="Apellido"
                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}/> 
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono</label>
                                    <InputMask
                                        onChange={(e) => setFormData({...formData, cellPhone: e.target.value})}
                                        className='form-control'
                                        value={formData.cellPhone}
                                        mask='9999-9999'>
                                    </InputMask>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="address">Dirección</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="address" 
                                    value={formData.address}
                                    placeholder="Dirección" 
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="gender">Género</label>
                                    <select defaultValue={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className='form-control' name="gender" id="gender">
                                        <option value="0" disabled>Selecciona el género</option>
                                        <option value="1">Femenino</option>
                                        <option value="2">Masculino</option>
                                        <option value="3">Otro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="birthdate">Incomes</label>
                                    <input
                                        onChange={(e) => setFormData({...formData, incomes: e.target.value})}
                                        className='form-control'
                                        value={formData.incomes}
                                        placeholder="incomes"  />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="birthdate">Profession</label>
                                    <input
                                        onChange={(e) => setFormData({...formData, profession: e.target.value})}
                                        className='form-control'
                                        value={formData.profession}
                                        placeholder="Profession"  />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mt-4">
                                <button type="submit" className='btn btn-primary btn-block w-100'>Guardar cliente</button>
                            </div>
                            <div className="col-12 mt-4">
                                <button type="button" onClick={cancelEdit} className='btn btn-danger btn-block w-100'>Cancelar</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>)

                : 

                (
                    <>
                        <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 info-data">
                    <div className="info d-flex flex-row align-items-center justify-content-between">
                        <p className='label'>Nombre</p>
                        <p className='value'>{customerInfo?.firstName}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 info-data">
                    <div className="info d-flex flex-row align-items-center justify-content-between">
                        <p className='label'>Apellido:</p>
                        <p className='value'>{customerInfo?.lastName}</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 info-data">
                    <div className="info d-flex flex-row align-items-center justify-content-between">
                        <p className='label'>Dirección:</p>
                        <p className='value'>{customerInfo?.address}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 info-data">
                    <div className='info d-flex flex-row align-items-center justify-content-between'>
                        <p className='label'>Género</p>
                        <p className='value'>{customerInfo?.gender}</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 info-data">
                    <div className="info d-flex flex-row align-items-center justify-content-between">
                        <p className='label'>Teléfono:</p>
                        <p className='value'>{customerInfo?.cellPhone}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 info-data">
                    <div className='info d-flex flex-row align-items-center justify-content-between'>
                        <p className='label'>Incomes</p>
                        <p className='value'>{customerInfo?.incomes}</p>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="info d-flex flex-row align-items-center justify-content-between">
                        <button onClick={edit} className='btn btn-info btn-block w-100'>Editar</button>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className='info d-flex flex-row align-items-center justify-content-between'>
                        <button onClick={onDelete} className="btn btn-danger btn-block w-100">Eliminar</button>
                    </div>
                </div>
            </div>
                    </>
                )
            }

        </div>
        </>
        
    );
}

export default CustomerInfo;