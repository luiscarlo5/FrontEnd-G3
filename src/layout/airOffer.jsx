import { Button } from "primereact/button";
import './airOffer.css'

const AirOffer = () => {
    return (
        <div className='divPrimary flex justfy-content-center align-items-center mx-5 mt-5 flex-wrap lg:flex-nowrap md:px-8'>
            <div className='bg-red-400 lg:w-5 sm:w-12 '>
                <img src='../src/assets/img/AirJordan.png' className='w-full'/>
            </div>
            <div className='m-5 lg:w-7 sm:w-12'  >
                <p className=' text-primary font-bold'>Oferta Especial</p>
                <h1>Air Jordan edição de colecionador</h1>
                <p className="flex">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum rerum ipsum dolorum saepe accusantium, minus iste magnam, blanditiis corrupti repellat a impedit cumque quo sapiente, perspiciatis consequuntur in quam fugit?</p>
                <Button >Ver Oferta</Button>
            </div>
        </div>

    );
}

export default AirOffer;