import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import 'primeflex/primeflex.css';

const FilterGroup = ({ filters, setFilters }) => {
    const brands = ['Adidas', 'K-Swiss', 'Nike', 'Puma'];
    const categories = ['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'];
    const genders = ['Masculino', 'Feminino', 'Unisex'];
    const states = ['Novo', 'Usado'];

    const handleFilterChange = (category, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [value]: !prevFilters[category][value]
            }
        }));
    };

    const handleStateChange = (e) => {
        const { value, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            estado: {
                ...prevFilters.estado,
                [value]: checked
            }
        }));
    };

    return (
        <div className="p-p-4 px-0 m-0">
            <h3>Filtrar por</h3>
            <Divider />
            
            <h4>Marca</h4>
            <div className="p-grid">
                {brands.map(brand => (
                    <div key={brand} className="p-field-checkbox p-col-12 p-md-6 p-lg-4">
                        <Checkbox 
                            inputId={brand} 
                            name="brand" 
                            value={brand} 
                            onChange={() => handleFilterChange('marca', brand)} 
                            checked={filters.marca[brand] || false} 
                        />
                        <label htmlFor={brand} className="p-checkbox-label">{brand}</label>
                    </div>
                ))}
            </div>
            <Divider />

            <h4>Categoria</h4>
            <div className="p-grid">
                {categories.map(category => (
                    <div key={category} className="p-field-checkbox p-col-12 p-md-6 p-lg-4">
                        <Checkbox 
                            inputId={category} 
                            name="category" 
                            value={category} 
                            onChange={() => handleFilterChange('categoria', category)} 
                            checked={filters.categoria[category] || false} 
                        />
                        <label htmlFor={category} className="p-checkbox-label">{category}</label>
                    </div>
                ))}
            </div>
            <Divider />

            <h4>Gênero</h4>
            <div className="p-grid">
                {genders.map(gender => (
                    <div key={gender} className="p-field-checkbox p-col-12 p-md-6 p-lg-4">
                        <Checkbox 
                            inputId={gender} 
                            name="gender" 
                            value={gender} 
                            onChange={() => handleFilterChange('genero', gender)} 
                            checked={filters.genero[gender] || false} 
                        />
                        <label htmlFor={gender} className="p-checkbox-label">{gender}</label>
                    </div>
                ))}
            </div>
            <Divider />

            <h4>Estado</h4>
            <div className="p-grid">
                {states.map(state => (
                    <div key={state} className="p-field-radiobutton p-col-12 p-md-6 p-lg-4">
                        <RadioButton 
                            inputId={state} 
                            name="state" 
                            value={state} 
                            onChange={handleStateChange} 
                            checked={filters.estado[state] || false} 
                        />
                        <label htmlFor={state} className="p-radiobutton-label">{state}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

FilterGroup.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired
};

export default FilterGroup;
