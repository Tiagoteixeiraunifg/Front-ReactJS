import React, { Component} from 'react';
import { Carousel } from 'react-bootstrap';


export const carrouselTecnologias = () => {

        return (
            <>
                 <Carousel>
                 {/*REACT JS*/}
                 <Carousel.Item>
                     <img
                         className="d-block w-100"
                         src="holder.js/800x400?text=First slide&bg=373940"
                         alt="First slide"
                     />
                     <Carousel.Caption>
                         <h3>ReactJS</h3>
                         <p>Uma biblioteca JavaScript para criar interfaces de usuário</p>
                     </Carousel.Caption>
                 </Carousel.Item>
                 {/*TYPESCRIPT */}
                 <Carousel.Item>
                     <img
                         className="d-block w-100"
                         src="holder.js/800x400?text=Second slide&bg=282c34"
                         alt="Second slide"
                     />
     
                     <Carousel.Caption>
                         <h3>Type Script</h3>
                         <p>TypeScript é uma linguagem de programação fortemente tipada que se 
                             baseia em JavaScript, oferecendo melhores ferramentas em qualquer escala.</p>
                     </Carousel.Caption>
                 </Carousel.Item>
                 {/*Bootstrap*/}
                 <Carousel.Item>
                     <img
                         className="d-block w-100"
                         src="holder.js/800x400?text=Third slide&bg=20232a"
                         alt="Third slide"
                     />
     
                     <Carousel.Caption>
                         <h3>Bootstrap</h3>
                         <p>Kit de ferramentas de front-end poderoso, extensível e repleto de recursos</p>
                     </Carousel.Caption>
                 </Carousel.Item>
             </Carousel>
         </>  
         )

}
