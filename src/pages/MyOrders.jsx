import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import PhotoService from '../services/PhotoService';
import { getCartItems, removeFromCart, addToCart, AddOneQuantity, RemoveOneQuantity  } from '../services/CartService';
import '../styles/MyOrders.css';
import styled from 'styled-components';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import React from 'react'; 
import { Button } from 'primereact/button';
import { Link, useParams } from 'react-router-dom';


const SectionCart = styled.section`
    margin: 0px;
    & section h3{
        margin: 0px;
        padding: 20px 0px;
        border-bottom: solid 2px gray;
        width: 100%;
    }
    & section div p{
        text-align: center;
    }
`;


const getRandomProducts = (products, excludeId, count) => {
    const filteredProducts = products.filter(product => product.id !== excludeId);
    const randomProducts = [];
    while (randomProducts.length < count && filteredProducts.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredProducts.length);
        randomProducts.push(filteredProducts.splice(randomIndex, 1)[0]);
    }
    return randomProducts;
};

const MyOrders = () => {
    const [cart, setCart] = useState([]);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const items = getCartItems();
        setCart(items);

        PhotoService.getPhotos().then(data => {
            const selectedProduct = data.find(p => p.id === parseInt(id));
            setProduct(selectedProduct);
            const randomProducts = getRandomProducts(data, parseInt(id), 4);
            setRelatedProducts(randomProducts);
        });
    },[id]);
    

    const handleAddOneQuantify = (product) => {
        AddOneQuantity(product);
        setCart(getCartItems()); // Atualiza o estado com os itens do localStorage
    };
    
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        setCart(getCartItems()); // Atualiza o estado com os itens do localStorage
        if(cart[productId].quantity === 0){
            handleRemoveOneQuantity(cart[productId]);
        }
    };
    
    const handleRemoveOneQuantity = (product) => {
        RemoveOneQuantity(product);
        setCart(getCartItems()); // Atualiza o estado com os itens do localStorage
    };
    

    // Calcular total e descontos
    const { totalValue, totalDiscount } = cart.reduce(
        (totals, item) => {
            const itemTotal = item.quantity * item.price;
            const itemDiscount = item.priceDiscount
                ? item.quantity * item.priceDiscount
                : 0;

            return {
                totalValue: totals.totalValue + itemTotal,
                totalDiscount: totals.totalDiscount + itemDiscount,
            };
        },
        { totalValue: 0, totalDiscount: 0 } // Valores iniciais
    );
    return (
        <SectionCart className='m-0 p-0' >
            <section  className='flex flex-wrap column-flex bg-pink-300 gap-5 lg:w-11 align-self-center  md:w-12 lg:mx-7 lg:my-4 sm:mx-0 sm:my-2 md:mx-5 m-0 p-2 h-auto'>
                 <div className='pt-0 flex flex-wrap column-flex md:row-flex bg-white m-0 border-round-md gap-1 p-5 row-gap-0 h-auto lg:w-8 md:w-12' >
                        {/*Meus Pedidos */}
                        <div className='w-12 px-0 flex align-items-center text-center  py-5 column-flex py-0 my-0  h-3rem m-0'>
                            <h3 className='w-5 text-left'>Meus Pedidos</h3>
                            <h3 className='w-3'>Quantidade</h3>
                            <h3 className='w-2  '>Unitário</h3>
                            <h3 className='w-2'>Total</h3>

                        </div>
                        <div className='flex flew-wrap w-12 justify-content-between  gap-0 m-0 p-0'>
                        <    div className='w-12 m-0 block '>
                            {cart.length === 0 ? (
                                    <div className="cart-empty">Seu carrinho está vazio.</div>
                                ) : (
                                    cart.map((item) => (
                                        <div className='flex flex-wrap column-flex md:row-flex border-3 lg:h-7rem md:h-20rem my-2 w-12 px-0 PB-5'>
                                            <div className='flex flew-wrap lg:w-5  md:w-12 bg-red-500 sm:w-11'>
                                                <img src={item.img} className='block bg-blue-100 h-6rem mt-2 p-1 border-round-md w-7 p-0'/>
                                                <p className='w-9 block text-left ml-2 inline'> {item.title} </p>
                                            </div>
                                            { /*Quantidade*/}
                                            <div className=' lg:w-3 sm:w-12 flex flex-wrap h-6rem align-items-center my-0 mx-0 sm:inline'>
                                                <div key={item.id} className='flex column-flex flex-wrap gap-2 h-100 justify-content-center align-items-center'>
                                                    <Button icon="pi pi-minus" onClick={() =>  handleRemoveOneQuantity(item) }  className='h-2rem w-2rem bg-white border-200 border-1 border-round-sm ' style={{ color: 'gray ' }} /> 
                                                    <p className='pt-0'> {item.quantity} </p>
                                                    <Button icon="pi pi-plus" onClick={() => handleAddOneQuantify(item)} className='h-2rem w-2rem bg-white border-200 border-1 border-round-sm'  style={{ color: 'gray ' }}/>
                                                    <p  
                                                        className='w-12 block m-0 p-0 text-sm  text-gray cursor-pointer'
                                                        onClick={() => handleRemoveFromCart(item.id)}
                                                    >Remover item</p>
                                                </div>
                                            </div>   
                                            { /*Unitário*/}
                                            <div className='lg:w-2 sm:w-12 h-6rem justify-content-center mx-0'>
                                                <div className='h-100 '>
                                                    {item.priceDiscount ? (
                                                        <p className='text-md font-semibold text-300 line-through'> R$ {item.priceDiscount} </p>
                                                    ) : (
                                                        <p className='text-md font-semibold text-300 line-through'>Sem desconto</p>
                                                    )}
                                                    <p className='font-bold text-lg'> R$ {item.price} </p>
                                                </div>
                                            </div>
                                            { /*Total*/}
                                            <div className='lg:w-2 sm:w-12 h-6rem justify-content-center mx-0 '>
                                                <div className='justify-content-center align-content-start w-12 h-6rem m-0 p-0  '>
                                                    {item.priceDiscount ? (
                                                        <p className='text-md font-semibold text-300 line-through'> R$ {item.quantity * item.priceDiscount} </p>
                                                    ) : (
                                                        <p className=' text-md font-semibold text-300 line-through'>Sem desconto</p>
                                                    )}
                                                    
                                                    <p className='font-bold text-lg '> R$ {item.quantity * item.price} </p>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    ))
                                )}
                            </div> 
                        </div>
                    </div>
                    
                
                

                    {/*Resumo */}
                    <div className='flex lg:w-3 sm:w-12 bg-blue h-16rem bg-white border-round-md px-4'>
                        <div className='w-12' >
                            <h3>Resumo</h3>
                            <div className='flex row-flex flex-wrap w-11 justify-content-between'>
                                <p>Subtotal: {totalValue}</p>
                                <p>Frete: {111}</p>
                                <p>Desconto: {totalDiscount} </p>
                            </div>
                        </div>
                    </div>
                    <div className='w-12 gap-0 m-0 p-0'>
                    <div className="flex justify-content-between flex-nowrap  w-12 align-items-center pl-3">
                        <h3 className='border-none fs-lg'>Produtos Relacionados</h3>
                        <Link className="link m-0 p-0 w-8rem" to="/products">Ver Todos ⟶</Link>
                    </div>
                    <div className="related-products-list grid justify-content-center">
                        {relatedProducts.map((relatedProduct, index) => (
                            <div key={index} className="lg:col-3">
                                <ProductCard
                                    id={relatedProduct.id}
                                    image={relatedProduct.img}
                                    type={relatedProduct.type}
                                    name={relatedProduct.title}
                                    price={relatedProduct.price}
                                    priceDiscount={relatedProduct.priceDiscount}
                                />
                            </div>
                        ))}
                    </div>
                    </div>

             

            </section>
            
        </SectionCart>
    );
};

export default MyOrders;
