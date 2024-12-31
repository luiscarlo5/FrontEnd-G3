import AirOffer from "../layout/airOffer";
import { CarouselNyke, } from "../layout/CarouselNyke"
import { Collection } from "../layout/Collections";
import ProductListing from "./ProductListing/ProductListing";


const Section = () => {
    return (
        <main>
            <CarouselNyke/>
            <Collection />
            <ProductListing/>
            <AirOffer/>
        </main>
    );
}

export default Section;