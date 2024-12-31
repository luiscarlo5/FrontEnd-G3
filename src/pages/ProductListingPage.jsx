import { useState, useEffect } from 'react';
import FilterGroup from '../components/FilterGroup';
import ProductCard from '../components/ProductCard/ProductCard';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import PhotoService from '../services/PhotoService';
import 'primeflex/primeflex.css';
import '../App.css';

const initialFilters = {
    marca: { Nike: false, 'K-Swiss': false, Adidas: false, Puma: false },
    categoria: { 'Esporte e lazer': false, Casual: false, Utilitário: false, Corrida: false },
    genero: { Masculino: false, Feminino: false, Unisex: false },
    estado: { Novo: false, Usado: false }
};

const sortProducts = (products, criteria) => {
    switch (criteria) {
        case 'low-to-high':
            return products.slice().sort((a, b) => a.price - b.price); // Use slice to avoid mutating the original array
        case 'high-to-low':
            return products.slice().sort((a, b) => b.price - a.price); // Use slice to avoid mutating the original array
        default:
            return products; // 'relevant' or default case
    }
};

const ProductListingPage = () => {
    const [filters, setFilters] = useState(initialFilters);
    const [products, setProducts] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('relevant');

    useEffect(() => {
        PhotoService.getPhotos().then(setProducts);
        window.scrollTo(0, 0); // Rolando para o topo da página ao montar o componente
    }, []);

    const isAnyFilterActive = (filterCategory) =>
        Object.values(filters[filterCategory]).some(value => value);

    const filteredProducts = products.filter(product =>
        (filters.marca[product.type] || !isAnyFilterActive('marca')) &&
        (filters.categoria[product.categoria] || !isAnyFilterActive('categoria')) &&
        (filters.genero[product.genero] || !isAnyFilterActive('genero')) &&
        (filters.estado[product.estado] || !isAnyFilterActive('estado'))
    );

    const sortedProducts = sortProducts(filteredProducts, sortCriteria);

    const sortOptions = [
        { label: 'Mais Relevantes', value: 'relevant' },
        { label: 'Preço: Mais barato', value: 'low-to-high' },
        { label: 'Preço: Mais caro', value: 'high-to-low' }
    ];

    return (
        <div className="productPage md:px-8">
            <div className="flex">
                <aside className="filter hidden md:block mx-1 flex-none">
                    <FilterGroup filters={filters} setFilters={setFilters} />
                </aside>
                <main className="">
                    <div className="order flex justify-content-end align-items-center">
                        <label htmlFor="sort " className='px-5'>Ordenar por</label>
                        <Dropdown
                            id="sort"
                            options={sortOptions}
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.value)}
                            placeholder="Selecione"
                        />
                        <Button
                            icon="pi pi-filter"
                            className="md:hidden button-outlined button-primary mx-4"
                            onClick={() => setSidebarVisible(true)}
                        />
                    </div>
                    <div className="grid gap-0 justify-content-center">
                        {sortedProducts.map((product) => (
                            <div key={product.id} className="lg:col px-0">
                                <ProductCard
                                    id={product.id}
                                    image={product.img}
                                    type={product.type}
                                    name={product.title}
                                    price={product.price}
                                    priceDiscount={product.priceDiscount} />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} className="p-sidebar-md p-d-md-none sidebar">
                <FilterGroup filters={filters} setFilters={setFilters} />
            </Sidebar>
        </div>
    );
};

export default ProductListingPage;
