import { Product } from "@/core/models/Product";
import Image from "next/image";
import Link from "next/link";

export interface ListProductItemProps{
    product: Product,
}

export default function ListProductItem(props: ListProductItemProps){
    return(

        <div key={props.product.id} className="mx-5 p-5 border hover:border-zinc-300 hover:shadow-2xl transition-all duration-300 rounded-md">
        <Link href={`/product/${props.product.slug}`}>
            <div className="relative h-[300px]">
                <Image className="rounded-md" src="/assets/plant1.jpg" alt="plant" layout="fill"/>
            </div>
            {   props.product.stock > 0 ? (    
                    <div className="flex flex-col gap-10 pt-2 text-primary ">
                        <span className="text-lg font-semibold">{props.product.name}</span>
                        <span className="text-xl font-bold">$ {(props.product.price.toFixed(2))}</span>
                    </div>
                ):(
                    <div className="flex flex-col gap-10 pt-2 text-primary ">
                        <span className="text-lg font-semibold">{props.product.name}</span>
                        <span className="text-center text-3xl font-bold text-red-600">Sold Out</span>
                    </div>
                )
            }

        </Link>
        </div>

    )
}