import React, { useState } from "react";

function Product(props) {
  const [productName, setProductName] = useState(props.name);
  const [productPrice, setProductPrice] = useState(props.price);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const token = props.token; // Retrieve token from props
    fetch(`http://localhost:2000/products/${props._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Baerer ' + token
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      props.updateProductList();
    })
    .catch(error => console.error(error));
  };

  const handleUpdate = () => {
    const token = props.token; 
    const updateData = [
      { propName: "name", value: productName },
      { propName: "price", value: productPrice }
    ];
    fetch(`http://localhost:2000/products/${props._id}`, {
      method: "PATCH",
      headers: {
        'Authorization': 'Baerer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
    
      setIsEditing(false);
      props.updateProductList();
    })
    .catch(error => console.error(error));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setProductName(props.name);
    setProductPrice(props.price);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="button-container">
        {isEditing ? (
          <>
            <button alt="blue" onClick={handleUpdate}>Save</button>
            <button alt="red" onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button alt="blue" onClick={handleEdit}>Edit</button>
            <button alt="red"  onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      <img className="card_image" src={props.productImage} alt="Product" />
      <h3>ID: {props._id}</h3>
      {isEditing ? (
        <>
          <input alt="name" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input alt="price" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </>
      ) : (
        <>
          <h3>Name: {props.name}</h3>
          <h3>Price: {props.price}</h3>
        </>
      )}
    </div>
  );
}

export default Product;