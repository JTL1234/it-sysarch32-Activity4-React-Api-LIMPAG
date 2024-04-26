import React, { useState } from 'react';

function AddProduct({ setOpenModal, token, updateProductList }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [productImage, setProductImage] = useState(null); // Store file as state

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleProductImageChange = (event) => {
        // Store the selected file
        setProductImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Check if any field is empty
        if (!name || !price || !productImage) {
            setMessage('Please fill in all fields');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description); // Append description to form data
        formData.append('productImage', productImage);
    
        try {
            const response = await fetch('http://localhost:2000/products/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
                }
            });
    
            const data = await response.json();
    
            if (response.ok && data.message === 'Created product successfully') {
                setMessage('Data added successfully');
                // Clear input fields
                setName('');
                setPrice('');
                setDescription('');
                setProductImage(null);
                setOpenModal(false);
                // Call the updateProductList callback to refresh the product list
                updateProductList();
            } else if (data.message === 'Auth failed') {
                setMessage('Authorization required. Please log in or sign up.');
            } else {
                setMessage('No data added');
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
                        <h1>Add Product</h1>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="productName">Name:</label>
                            <input type="text" id="productName" placeholder="Add Coffee product" value={name} onChange={handleNameChange} />
                            <label htmlFor="productPrice">Price:</label>
                            <input type="text" id="productPrice" placeholder="Enter Coffee product price" value={price} onChange={handlePriceChange} />
                            <label htmlFor="productDescription">Description:</label>
                            <textarea id="productDescription" placeholder="Enter product description" value={description} onChange={handleDescriptionChange} />
                            <label htmlFor="productImage">Choose file:</label>
                            <input type="file" id="productImage" onChange={handleProductImageChange} />
                            <div className="footer">
                                <button onClick={() => { setOpenModal(false); }} id="cancelBtn">Cancel</button>
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

export default AddProduct;
