
import Carousel from 'react-bootstrap/Carousel';
import { Catalogo } from "../catalogo/Catalogo";
import DondeEstamos from "../dondeEstamos/DondeEstamos";
import "./Home.css";

const Home = () => {

    return (
        <>
            <div className='titulo text-center'>Musical Henrix</div>
            <Carousel>
                <Carousel.Item>
                    <img src="https://images.pexels.com/photos/68710/pexels-photo-68710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100 carousel-image" alt="..." />
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://images.pexels.com/photos/5855909/pexels-photo-5855909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100 carousel-image" alt="..." />
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://images.pexels.com/photos/8722689/pexels-photo-8722689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100 carousel-image" alt="..." />
                </Carousel.Item>
            </Carousel>
                <div className='p-5 descripcion'> Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
                        experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
                        mejores elecciones para tu compra musical.
                </div>
        </>
    );
};

export default Home;