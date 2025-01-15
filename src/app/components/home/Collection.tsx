import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface CollectionProps{
    title: string,
    collections: {
        name:string,
        href: string,
        src: string,
    }[],
}

export default function Collection(props: CollectionProps){

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return(

        <div>
            <h1 className="text-secondary text-3xl font-bold text-center">{props.title}</h1>
            {/*Desktop*/}
            <div className="hidden md:block mt-10">
                <div className="flex gap-5">
                    {
                        props.collections.map((collection, index)=>(
                            <Link href={collection.href} key={index}>
                                <Image className="rounded-lg" src={collection.src} alt={collection.name}  layout="responsive" width={670} height={447}/>
                            </Link>
                        ))
                    }
                </div>
            </div>

            {/*Mobile*/}
            <div className="block md:hidden mt-10">
                <div>
                    <Slider {...settings}>
                        {
                            props.collections.map((collection, index)=>(
                                <Link href={collection.href} key={index}>
                                    <Image className="rounded-lg" src={collection.src} alt={collection.name} layout="responsive" width={670} height={447}/>
                                </Link>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </div>

    )

}