import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ListProductItem from "./ListProductItem";
import { Product } from "@/core/models/Product";

export interface ListProductProps{
    title: string,
    products: Product[],
}

export default function ListProduct(props: ListProductProps){
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
               breakpoint: 1200,
               settings: {
                   slidesToShow: 3,
                   slidesToScroll: 3
               }
             },
             {
               breakpoint: 1000,
               settings: {
                   slidesToShow: 2,
                   slidesToScroll: 2
               }
             },
             {
               breakpoint: 500,
               settings: {
                   slidesToShow: 1,
                   slidesToScroll: 1
               }
             }
         ]
      };

    return(

        <div>
            <h1 className="text-secondary text-3xl font-bold text-center">{props.title}</h1>
            <div className="mt-10">
                <Slider {...settings}>            
                    {
                        props.products.map((product)=>(
                            <ListProductItem key={product.id} product={product} />
                        ))
                    }
                </Slider>   
            </div>         
        </div>

    )

}