import React, { useState, useEffect } from 'react';
import Product from './Product';
import Modal from "./AddProduct";
import ModalOrder from "./AddOrder";
import Order from './Order';

function Home({ token }) {
  const [activeSection, setActiveSection] = useState('Products');
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenOrder, setModalOpenOrder] = useState(false);

  const updateProductList = () => {
    fetchProducts('products');
  };

  const updateOrderList = () => {
    fetchProducts('orders');
  };

  const fetchProducts = (type) => {
    const url = `http://localhost:2000/${type}/`;
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (type === 'products') {
        const updatedProducts = data.products.map(product => ({
          ...product,
          productImage: `http://localhost:2000/${product.productImage}`
        }));
        setProductList(updatedProducts);
      } else {
        setOrderList(data.orders);
      }
    })
    .catch(error => setError(error.message));
  };

  useEffect(() => {
    activeSection === 'Products' ? updateProductList() : updateOrderList();
  }, [token, activeSection]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <div className="topnav-container">
        <div className="topnavs">
          <h2>CafeStore</h2>
          <a className="logo"></a>
        </div>
        <div className="topnav">
          <a className={activeSection === 'Products' ? 'active' : ''} onClick={() => handleSectionChange('Products')}>Products</a>
          <a className={activeSection === 'Orders' ? 'active' : ''} onClick={() => handleSectionChange('Orders')}>Orders</a>
        </div>
      </div>

      {activeSection === 'Products' && (
        <div>
          <div className="Coffee">
            <div className='navbar2'>
              <h1>Coffee Menu Information</h1>
              <button className="openModalBtn" onClick={() => setModalOpen(true)}> Add Drinks </button>
              {modalOpen && <Modal setOpenModal={setModalOpen} token={token} updateProductList={updateProductList} />}
            </div>
          </div>

          <div className="list-container">
            {productList.map(product => (
              <Product
                key={product._id}
                _id={product._id}
                name={product.name}
                price={product.price}
                productImage={product.productImage}
                token={token}
                updateProductList={updateProductList}
              />
            ))}
          </div>
        </div>
      )}

      {activeSection === 'Orders' && (
        <div>
          {error && <div>Error: {error}</div>}
          <div className="Coffee">
            <div className='navbar2'>
              <h1>Orders Information</h1>
              <button className="openModalBtn" onClick={() => setModalOpenOrder(true)}> Add Order </button>
              {modalOpenOrder && <ModalOrder setOpenModalOrder={setModalOpenOrder} token={token} updateOrderList={updateOrderList} />}
            </div>
          </div>

          <div className="list-container">
            {orderList.map(order => (
              <Order
                key={order._id}
                id={order._id}
                productId={order.product._id}
                productName={order.product.name}
                productPrice={order.product.price}
                quantity={order.quantity}
                token={token}
                updateOrderList={updateOrderList}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
