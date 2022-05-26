import './Customer.scss';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

function Customer() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        cellPhone: '',
        lastName: '',
        address: '',
        incomes: '',
        gender: '',
        profession: ''
    });

    const onSubmit = (event) => {
        event.preventDefault();

        console.log(formData)

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

        CustomerService.createCustomer(formData).then(response => {
            toast.success('Cliente creado', {
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
                })
                navigate('/', { replace: true });
        }, err => {
            toast.error('Error al crear cliente', {
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

    return (
        <>
        <header>
            <div className="container">
                <div className="row">
                <div className="col-12 d-flex flex-row justify-content-start align-items-center">
                        <Link className="btn btn-info mx-2" to="/">Atrás</Link>
                        <p>Agregar cliente</p>
                    </div>
                </div>
            </div>
        </header>

        <div className="container">

            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <p className='info-title'>Información del cliente</p>
                </div>
            </div>

            <div className="row">
                <div className="col-12 d-flex justify-content-center mt-5">
                    <form onSubmit={onSubmit}>

                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
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
                                    placeholder="Dirección" 
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="gender">Género</label>
                                    <select 
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})} 
                                    className='form-control' name="gender" id="gender"
                                    defaultValue={0}>
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
                                       />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label htmlFor="birthdate">Profession</label>
                                    <input
                                        onChange={(e) => setFormData({...formData, profession: e.target.value})}
                                        className='form-control'
                                       />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mt-4">
                                <button className='btn btn-primary btn-block w-100'>Guardar cliente</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Customer;