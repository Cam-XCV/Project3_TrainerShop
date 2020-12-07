import React from 'react';

import { Link } from 'react-router-dom';
import Request from '../../helpers/request';
import CustomerBox from '../CustomerBox';
import CustomerOrder from './CustomerOrder';
import './order.css'



    
    

const CustomerDetail = ({customer, onUpdate}) => {

    if(!customer){
        return <p>Loading...</p>
    }

    const onChange = function(customer){
        const request = new Request();
        const url = "/customers/" + customer.id;
        request.patch(url, customer)
        .then(() => window.location = "/customers")
    }


    const logOut = function(){
        customer.loggedIn = false;
        onChange(customer)
    }

    const onBuy = function(customer){
        const request = new Request();
        const url = "/customers/" + customer.id;
        request.patch(url, customer)
        .then(() => window.location = "/customers/cart")
    }

    const addToCart = function(shoes){
        for(let shoe of shoes){
            customer.cart.push(shoe)
        }
        onBuy(customer);
    }

    



    const orderNodes = customer.previousOrders.map((order, index) =>{
        return(
            <li key={index} className="order-details" >
	        <div >
	            <CustomerOrder order={order} />
                <button onClick={() => {addToCart(order.shoes)}}className="buy-again">Buy Again</button>
	        </div>
	     </li>
        )
    })


    if(!customer){
        return <p>
            Login to View Your Details
        </p>
    }



    const editUrl = "/customers/" + customer.id + "/edit" 
    return(
        <>
        <h1>{customer.name}</h1>
        <img src={customer.avatar} className="customer-avatar"></img>

        <button onClick={logOut}>Log out</button>
        <Link to ={"/"} customer={customer}><button>Go shopping</button></Link>
         

        {console.log(customer)}
        <Link to={editUrl}><button type="button">Edit Account</button></Link>
           
        {orderNodes}

        {/* <span style="font-size: 48px; color: Dodgerblue;">
            <i class="fas fa-camera"></i>
        </span> */}
        

        

        </>
    )
}

export default CustomerDetail;