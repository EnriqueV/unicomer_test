import './App.scss';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomerService from './services/CustomerService';

function App() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    getCustomers();
  }, [])

  const getCustomers = () => {
    CustomerService.getAll().then(response => {
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    }, err => {
      console.log(err);
    });
  }

  const filterCustomers = (event) => {
      let text = event.target.value; 
      setFilterText(text);

        if (text === '') {
            getCustomers();
            return;
        }

        setFilteredCustomers(customers.filter((customer) => {
            return (customer.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1 || customer.firstName.indexOf(text.toLowerCase()) > -1) 
            || (customer.lastName.toLowerCase().indexOf(text.toLowerCase()) > -1 || customer.lastName.indexOf(text.toLowerCase()) > -1)
        }));
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center mt-5">
            <input type="text" placeholder='Search' className='searchInput' value={filterText} onChange={filterCustomers} />
          </div>

          <div className="col-12 d-flex justify-content-center mt-4">
            <Link className='btn btn-primary btn-block w-100' to="/customer">Agregar cliente</Link>
          </div>
        </div>

        <div className="row d-flex flex-row align-items-center justify-content-center mt-5">

          {
            filteredCustomers.map((customer, index) => {
              return (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12 mt-2">

                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{customer.firstName} {customer.lastName}</Card.Title>
                      <Card.Text>
                        {customer.cellPhone}
                      </Card.Text>
                      <Card.Text>
                        {customer.profession}
                      </Card.Text>
                      <Link className='btn btn-primary btn-block w-100' to={'/customer/' + customer.id}>Ver información</Link>
                    </Card.Body>
                  </Card>
            
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  );
}

export default App;
