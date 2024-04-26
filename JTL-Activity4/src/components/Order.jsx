
import React from 'react';

function Order(props) {

    const handleDelete = () => {
        const token = props.token; // Retrieve token from props
        fetch(`http://localhost:2000/orders/${props.id}`, {
          method: "DELETE",
          headers: {
            'Authorization': 'Baerer ' + token
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
          props.updateOrderList();
        })
        .catch(error => console.error(error));
      };

    return (
        <div className="card">
            <h3>Order ID: {props.id}</h3>
            <h3>Product ID: {props.productId}</h3>
            <h3>Product Name: {props.productName}</h3>
            <h3>Product Price: {props.productPrice}</h3>
            <h3>Quantity: {props.quantity}</h3>
            <button className="btnDelete" onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Order;