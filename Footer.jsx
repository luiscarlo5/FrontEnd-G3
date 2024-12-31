import LogoFooter from '../assets/logo-footer.svg';
import LogoTwitter from '../assets/twitter.svg';
import LogoInsta from '../assets/instagram.svg';
import LogoFacebook from '../assets/facebook.svg';
import styled from "styled-components";

const FooterStyle = styled.footer`
    & footer{
        
    }
`;

const Footer = () => {


    return (
        
        <footer className='bg-gray-900 px-4 pt-5 pb-2 lg:px-6 lg:pt-7 md:px-5 md:pt-5 md:pb-1 w-full'>
            <div className='flex flex-wrap  lg:flex-row md:flex-column gap-5 md:gap-8  text-sm text-white   align-items-top lg:justify-content-between  md:justify-content-center'>
                
                {/*Digital Store */}                               
                <div className=' flex lg:w-3 pb-4 md:w-12 '>
                    <ul className='list-none   m-0 p-0'>
                        <li>
                            <div className='  pb-3 md:pb-2'>
                                <img src={LogoFooter} alt="LogoFooter" />
                            </div>
                        </li>
                        <li>
                            <p className=' pb-3 md:pb-2 text-xs'>
                                Lorem ipsum dolor sit amet, consectetur <br></br>
                                adipiscing elit, sed do eiusmod tempor<br></br> incididunt ut labore et dolore.
                            </p>
                        </li>
                        <li>
                            <div className='flex w-6  justify-content-between gap-2'>
                                <img src={LogoFacebook} alt="Logo Facebook" />
                                <img src={LogoInsta}    alt="Logo Instagram" />
                                <img src={LogoTwitter}  alt="Logo Twitter" />
                            </div>
                        </li>
                    </ul>

                </div>
                <div className='flex gap-5 justify-content-between pb-4 lg:w-3 md:w-12'>
                    {/*Informação */}
                    <div className='flex flex-column   text-xs row-gap-2 '>
                        <p className='pb-2 font-bold'>Informação</p>
                        <p>Sobre Drip Store</p>
                        <p>Segurança</p>
                        <p>Wishlist</p>
                        <p>Blog</p>
                        <p>Trabalhe conosco</p>
                        <p>Meus pedidos</p>
                    </div>

                    {/*Categorias */}
                    <div className='flex flex-column text-xs   row-gap-2 ' >
                        <p className='pb-2 font-bold'>Categorias</p>
                        <p>Camisetas</p>
                        <p>Calças</p>
                        <p>Bonés</p>
                        <p>Headphones</p>
                        <p>Tênis</p>
                </div>
                </div>
                {/*Contato */}
                <div className='flex pb-4 flex-column lg:w-2 md:w-2'>
                    <div className=' text-xs   row-gap-2 flex-wrap'>

                        <p className='pb-2 font-bold '>Contato</p>
                        <p >Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161</p>
                        <p >(85) 3051-3411</p>
                
                    </div>
                </div>
                <div className='flex w-screen border-top-1 border-surface-500 mx-1 py-3 justify-content-center '>
                    <p className=''>@2022 Digital Colege</p>
                </div>
              
              
            </div>
        </footer>
    
    );
}

export default Footer;
