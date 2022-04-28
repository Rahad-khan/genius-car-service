import React from 'react';
import { useParams } from 'react-router-dom';
import UseServiceDetail from '../../../hook/UseServiceDetail';
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [user] = useAuthState(auth)
    const [service] = UseServiceDetail(serviceId);
    const handleSubmitOrder = e => {
        e.preventDefault();
        const order  = {
            email : e.target.email.value,
            address : e.target.address.value,
            number : e.target.number.value,
            service : service.name,
            serviceId
        }
        axios.post("http://localhost:5000/order", order)
        .then((response) => {
            const {data} = response;
            if (data.insertedId) {
                toast("Your Order Placed Successfully !!!")
            }
        });
        e.target.reset();
    }
    return (
        <div>
            <h2>Please Checkout your booking on {service?.name}</h2>
            <form className='w-50 mx-auto' onSubmit={handleSubmitOrder}>
                <input className='form-control mb-2' type="text" name="name" defaultValue={user?.displayName} id="" />
                <input className='form-control mb-2' type="email" name="email" defaultValue={user?.email} id="" />
                <input className='form-control mb-2' type="text" name="" defaultValue={service?.name} id=""/>
                <input className='form-control mb-2' type="text" name="address" autoComplete="off" placeholder='Address' id="" required/>
                <input className='form-control mb-2' type="tel" name="number" placeholder='Phone Number' id="" required/>
                <button className='btn btn-outline-primary' type="submit">Send Order</button>
            </form>
        </div>
    );
};

export default Checkout;