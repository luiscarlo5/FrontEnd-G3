import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';

{/**CarouselNyke */}
export const CarouselNyke = () => {
    const carouselItems = [
        {
            imageSrc:'../src/assets/img/air.png',
            title: "Queima de estoque 🔥",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione odio ex quibusdam asperiores voluptate.",
            buttonText: "Ver Ofertas"
        },
        {
            imageSrc: "../src/assets/img/air.png",
            title: "Queima de estoque 🔥",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione odio ex quibusdam asperiores voluptate.",
            buttonText: "Ver Ofertas"
        },
        {
            imageSrc: "../src/assets/img/air.png",
            title: "Queima de estoque 🔥",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione odio ex quibusdam asperiores voluptate.",
            buttonText: "Ver Ofertas"
        },
        {
            imageSrc: "../src/assets/img/air.png",
            title: "Queima de estoque 🔥",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione odio ex quibusdam asperiores voluptate.",
            buttonText: "Ver Ofertas"
        }
    ];
    const itemTemplate = (item) => {
        return (
            <div className='divgallery flex justify-content-center md:px-8'>
                <div className='image'>
                    <img src={item.imageSrc} className="w-full" style={{ transform: 'rotate(-28deg) translateX(-38px)' }} />
                </div>
                <div className='divtext'>
                    <p className='p1 m-2'>Melhores ofertas personalizadas</p>
                    <h1>{item.title}</h1>
                    <p className='p2 m-2'>{item.description}</p>
                    <Button className="buttonCarousel" >{item.buttonText}</Button>
                </div>
            </div>

        );
    };

    return (
        <div className="card">
            <Carousel
                value={carouselItems}
                itemTemplate={itemTemplate}
                style={{ backgroundColor: '#F5F5F5' }}
                showNavigators={false}
                autoplayInterval={3000}
            />
        </div>
    );
};
