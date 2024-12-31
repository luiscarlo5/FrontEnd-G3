import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import ProductCard from '../components/ProductCard/ProductCard';
import PhotoService from '../services/PhotoService';
import { CartContext } from '../context/CartContext';
import { Toast } from 'primereact/toast'; // Importando Toast
import { Button } from 'primereact/button';
import '../styles/ProductViewPage.css';

const getRandomProducts = (products, excludeId, count) => {
    const filteredProducts = products.filter(product => product.id !== excludeId);
    const randomProducts = [];
    while (randomProducts.length < count && filteredProducts.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredProducts.length);
        randomProducts.push(filteredProducts.splice(randomIndex, 1)[0]);
    }
    return randomProducts;
};

const ProductViewPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { addItemToCart } = useContext(CartContext);
    const toast = useRef(null); // Referência para Toast

    useEffect(() => {
        PhotoService.getPhotos().then(data => {
            const selectedProduct = data.find(p => p.id === parseInt(id));
            setProduct(selectedProduct);
            const randomProducts = getRandomProducts(data, parseInt(id), 4);
            setRelatedProducts(randomProducts);
            window.scrollTo(0, 0); // Rolando para o topo da página ao montar o componente
        });
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addItemToCart({ ...product, quantity: 1 });
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Produto adicionado ao carrinho!', life: 3000 });
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const productImages = [
        { img: product.img, title: 'Imagem 1', color: '#E2E3FF' },
        { img: product.img, title: 'Imagem 2', color: '#FFE8BC' },
        { img: product.img, title: 'Imagem 3', color: '#FFC0BC' },
        { img: product.img, title: 'Imagem 4', color: '#DEC699' },
        { img: product.img, title: 'Imagem 5', color: '#E8DFCF' }
    ];

    return (
        <div className="product-view-page md:px-8">
            <Toast ref={toast} /> {/* Componente Toast */}
            <nav className="breadcrumb">
                <Link to="/">Home</Link> / 
                <Link to="/products"> Produtos</Link> / 
                <Link to="/products/tenis"> Tênis</Link> / 
               <b>{product.type}</b>
            </nav>
            
            <div className="md:flex md:flex-wrap">
                <div className="">
                    <ProductGallery images={productImages} />
                </div>
                
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p>{product.categoria} | Ref: RF-6547-5781</p>
                    <div className="price-info">
                        <span className="current-price">R$ {product.price}</span>
                        {product.priceDiscount && (
                            <span className="original-price">R$ {product.priceDiscount}</span>
                        )}
                    </div>
                    <div className="rating-info">
                        <span className="rating">4.7 (200 avaliações)</span>
                    </div>
                    <p className="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </p>
                    <div className="size-selector">
                        <label>Tamanho</label>
                        <div className="size-buttons">
                            <Button label="40" className="p-button-secondary" />
                            <Button label="41" className="p-button-secondary" />
                            <Button label="42" className="p-button-secondary" />
                            <Button label="43" className="p-button-secondary" />
                            <Button label="39" className="p-button-secondary" />
                        </div>
                    </div>
                    <div className="color-selector">
                        <label>Cor</label>
                        <div className="color-buttons m-2">
                            <Button style={{ backgroundColor: '#6FEEFF' }} className="p-button-rounded p-button-outlined" />
                            <Button style={{ backgroundColor: '#FF6969' }} className="p-button-rounded p-button-outlined" />
                            <Button style={{ backgroundColor: '#6D70B7' }} className="p-button-rounded p-button-outlined" />
                        </div>
                    </div>
                    <Button onClick={handleAddToCart} severity="warning" className="p-button-primary">Adicionar ao Carrinho</Button>
                </div>
            </div>

            <div className="related-products">
            <div className="flex justify-content-between align-items-center mb-4">
                    <h3>Produtos Relacionados</h3>
                    <Link className="link" to="/products">Ver Todos ⟶</Link>
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
        </div>
    );
};

export default ProductViewPage;
