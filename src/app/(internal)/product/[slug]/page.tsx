'use client'

import { use } from "react"; //Resolve asynchronous promises
import Image from "next/image";
import Link from "next/link";
import { IconHeart } from "@tabler/icons-react";

import useProduct from "@/app/data/hooks/product/useProduct";

import Layout from "@/app/components/template/Layout";
import { notFound } from "next/navigation";

export interface pageProps{
    slug: string,
}

export default function page({ params }: { params: Promise<{ slug: string }> }){

    const { slug } =  use(params);

    const {error, product, inFavorite, removeFavorite, addFavorite, inCart, removeCart, addCart} = useProduct({slug:slug});

    if(error) notFound();

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
                            <Link className="hover:underline hover:text-secondary text-xl font-bold" href={`/category/${product.category.toLowerCase()}`}>{product.category}</Link>
                            <div><span className="text-lg font-semibold">Stock:</span> {product.stock} Un.</div>          
                            <span className="text-3xl font-bold text-primary">$ {product.price.toFixed(2)}</span>
                            <div className="flex flex-col gap-5">
                                {   inCart ? (
                                        <button onClick={()=>removeCart(inCart)} className="w-full py-2 px-5 border border-black rounded-full font-semibold text-white bg-black">Remove to cart</button> 
                                    ):(
                                        product.stock > 0 ? (
                                            <button onClick={()=>{if(product.stock > 0) addCart(product.id)}} className="w-full py-2 px-5 border border-black rounded-full font-semibold text-white bg-black">Add to Cart</button> 
                                        ):(
                                               <span className="text-center text-3xl font-bold text-red-600">Sold Out</span>
                                        )
                                    )
                                }   
                                {   inFavorite ? (
                                        <button onClick={()=>removeFavorite(inFavorite)} className="w-full flex justify-center py-2 px-5 border border-black rounded-full font-semibold">Remove to favorites</button>
                                    ):(
                                        <button onClick={()=>addFavorite(product.id)} className="w-full flex justify-center py-2 px-5 border border-black rounded-full font-semibold">Add to favorites <IconHeart/></button>
                                    )
                                } 
                            </div>
                        </div>
                    </div>
                ):(
                    <div className="text-black text-center space-y-10">
                        <h1 className="text-7xl font-bold">"Loading ..."</h1>
                    </div>
                )}
            </div>
        </Layout>

    )

}