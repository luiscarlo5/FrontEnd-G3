import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import PhotoService from '../../services/PhotoService';
import './ProductListing.css';
import { Link } from 'react-router-dom';

const ProductListing = () => {
 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const photos = await PhotoService.getPhotos();
                const productsData = photos.map(photo => ({
                    id: photo.id,
                    image: photo.img,
                    name: photo.title,
                    price: photo.price,
                    priceDiscount: photo.priceDiscount,
                    type: photo.type,
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Erro ao carregar imagens:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="product-listing py-5 lg:px-4 md:px-2">
            <div className="container flex-wrap w-auto  mx-0 flex">
                <div className="flex w-12 lg:px-5 md:px-2 lg:justify-content-between  align-items-center mb-4">
                        <h3 cl>Produtos em Alta</h3>
                        <Link className="link" to="/products">Ver Todos ⟶</Link>
                </div>
                <div className="grid lg:mx-0 md:mx-0 w-auto border-round-sm p-0 m-0 w-screen lg:justify-content-between md:justify-content-around sm:justify-content-center lg:px-0 ">
                    {products.slice(0,8).map((product, index) => (
                        <div key={index} className="lg:col-3 w-auto px-0 ">
                            <ProductCard
                                id={product.id}
                                image={product.image}
                                type={product.type}
                                name={product.name}
                                price={product.price}
                                priceDiscount={product.priceDiscount} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductListing;
