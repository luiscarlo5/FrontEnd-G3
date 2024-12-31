import { Button } from 'primereact/button';

import { Link } from 'react-router-dom';

{/**Collection*/ }
export const Collection = () => {
    const productsCollection = [
        {
            discount: "30% OFF",
            title: "Novo drop Supreme",
            image: "../src/assets/img/collection-1.png",
            buttonText: "Comprar",
        },
        {
            discount: "30% OFF",
            title: "Coleção Adidas",
            image: "../src/assets/img/collection-2.png",
            buttonText: "Comprar",
        },
        {
            discount: "30% OFF",
            title: "Novo Beats Bass",
            image: "../src/assets/img/collection-3.png",
            buttonText: "Comprar",
        }
    ];


    const itemCollection = (item) => {
        return (
            <div className='flex'>
                <div className='relative'>
                    <img src={item.image} />
                </div>

                <div className="absolute">
                    <h3 className='m-3'>{item.discount}</h3>
                    <Button className='buttomItem' text raised severity="secondary" >{item.buttonText}</Button>
                </div>
            </div>
        );
    };

    return (
        <section className='md:px-8'>
            {/**Collection */}
            <div>
                <h3 className='py-6 m-0'>Coleções em destaque</h3>
            </div>
            <div className='flex flex-wrap justify-content-center gap-5'>
                {productsCollection.map((item, index) => (
                    <div key={index}>
                        {itemCollection(item)}
                    </div>
                ))}
            </div>

            {/**Collection ICON */}
            <div>
                <h3 className='py-6 text-center'>Coleções em destaque</h3>
                <div className=' flex justify-content-center'>
                    <ul className='collection flex list-none gap-4 px-1 py-1'>
                        <li>
                            <Button id='1' raised text outlined><img src="../src/assets/img/icon-camiseta.png" /></Button>
                            <label htmlFor="1">Camiseta</label>
                        </li>
                        <li>
                            <Button id='2' raised text outlined><img src="../src/assets/img/icon-calca.png" /></Button>
                            <label htmlFor="2">Calças</label>
                        </li>
                        <li>
                            <Button raised id='3' text outlined><img src="../src/assets/img/icon-calca.png" /></Button>
                            <label htmlFor="3">Bonés</label>
                        </li>
                        <li>
                            <Button id='4' raised text outlined><img src="../src/assets/img/icon-fone.png" /></Button>
                            <label htmlFor="4">Headphones</label>
                        </li>
                        <li>
                            <Link to={'/products'}>
                                <Button id='5' raised text outlined><img src="../src/assets/img/icon-sapato.png" /></Button>
                            </Link>
                                <label htmlFor="5">Tênis</label>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}