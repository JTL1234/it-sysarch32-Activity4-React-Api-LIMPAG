import React, { useState } from 'react';

function AddOrder({ setOpenModalOrder, token, updateOrderList }) {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const handleProductIdChange = (event) => {
        setProductId(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if any field is empty
        if (!productId || !quantity) {
            setMessage('Please fill in all fields');
            return;
        }

        const requestData = {
            productId: productId,
            quantity: quantity
        };

        try {
            const response = await fetch('http://localhost:2000/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (response.ok) {
                if (data.message === 'Order stored!') {
                    setMessage('Data added successfully');
                    // Clear input fields
                    setProductId('');
                    setQuantity('');
                    setOpenModalOrder(false);
                    // Call the updateProductList callback to refresh the product list
                    updateOrderList();
                } else {
                    setMessage(data.message);
                }
            } else {
                setMessage('Error: ' + data.message); // Display specific error message from server
            }
        } catch (error) {
            console.error('Error adding data:', error);
            setMessage('Failed to add data');
        }
    };

    return (
        <>
            <div className="addBackground">
                <div className="addContainer">
                    <div className="titleCloseBtn"></div>
                    <div className="title">
                        <h1>Add Order</h1>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="productId">ProductId:</label>
                            <input type="text" id="productId" placeholder="Enter product Id" value={productId} onChange={handleProductIdChange} />
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="text" id="quantity" placeholder="Enter quantity" value={quantity} onChange={handleQuantityChange} />
                            <div className="footer">
                                <button onClick={() => { setOpenModalOrder(false); }} id="cancelBtn">Cancel</button>
                                <button type="submit" className="blueButton">Add</button>
                            </div>
                        </form>
                    </div>
                    {message && <div className="message">{message}</div>}
                </div>
            </div>
        </>
    );
}

export default AddOrder;