'use client'

import { use } from "react"; //Resolve asynchronous promises
import Image from "next/image";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";

import useProduct from "@/app/data/hooks/product/useProduct";

import Layout from "@/app/components/template/Layout";

export interface pageProps{
    slug: string,
}

export default function page({ params }: { params: Promise<{ slug: string }> }){

    const { slug } =  use(params);

    const {product} = useProduct({slug:slug});

    return(

        <Layout>
            <div className="container mt-20">
                {product ? (
                    <div className="flex flex-col md:flex-row gap-10 justify-center">
                        <div>
                            <Image className="rounded-md" src="/assets/product.jpg" alt="plant" width={600} height={500}/>
                        </div>
                        <div className="flex flex-col lg:w-[400px] gap-5 p-5 border-2 rounded-lg">
                            <div className="text-primary text-4xl font-bold">
                                <h1>{product.name}</h1>
                            </div>
                            <div className="text-xl font-bold">
                                <Link className="hover:underline hover:text-secondary" href={`/category/${product.category.toLowerCase()}`}>{product.category}</Link>
                                <span> / </span>
                                <Link className="hover:underline hover:text-secondary" href="/">{product.type}</Link>
                            </div>
                            <div><span className="text-lg font-semibold">Stock:</span> {product.stock} Un.</div>          
                            <span className="text-3xl font-bold text-primary">$ {product.price.toFixed(2)}</span>
                            <div className="flex flex-col gap-5">
                                <button className="w-full py-2 px-5 border border-black rounded-full font-semibold text-white bg-black">Add to Cart</button>
                                <button className="w-full py-2 px-5 border border-black rounded-full font-semibold flex justify-center">Add to favorites <IconHeart/></button>    
                            </div>
                        </div>
                    </div>
                ):(
                    <div className="text-black text-center space-y-10">
                        <h1 className="text-7xl font-bold">"Sorry"</h1>
                        <p className="text-2xl font-semibold">Product not found.</p>
                    </div>
                )}
            </div>
        </Layout>

    )

}