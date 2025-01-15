'use client'

import { useParams } from "next/navigation";
import Image from "next/image";
import { IconHeart } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import useProduct from "@/app/data/hooks/product/useProduct";
import Layout from "@/app/components/template/Layout";

export default function Page(){

    const { slug } = useParams() as {slug:string};

    const { product, loading, inCart, inFavorite, removeProductToCart, addProductToCart, removeProductToFavorite, addProductToFavorite } = useProduct( {slug} );

    if(!loading && !product) notFound();

    return(

        <Layout>
            <div className="container mt-20">
                {   loading ? (
                        <div className="text-black text-center space-y-10">
                            <h1 className="text-7xl font-bold">&quot;Loading ...&quot;</h1>
                        </div>
                    ):( product && (
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <Image className="rounded-md" src="/assets/product.jpg" alt="plant" width={600} height={500}/>
                                </div>
                                <div className="flex flex-col gap-5 p-5 border-2 rounded-lg">
                                    <div className="space-y-2">
                                        <h1 className="text-primary text-4xl font-bold">{product.name}</h1>
                                        <p className="text-zinc-800 text-xl">{product.description}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Link className="hover:underline hover:text-secondary text-xl font-bold" href={`/category/${product.category.toLowerCase()}`}>{product.category}</Link>
                                        <div><span className="text-lg font-semibold">Stock:</span> {product.stock} Un.</div>          
                                        <p className="text-3xl font-bold text-primary">$ {product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        {   product.stock > 0 ? ( inCart ? (
                                                    <button onClick={()=>removeProductToCart(inCart)} className="py-2 px-5 border border-black rounded-full font-semibold text-white bg-black">Remove to Cart</button> 
                                                ):(
                                                    <button onClick={()=>addProductToCart(product.id)} className="py-2 px-5 border border-black rounded-full font-semibold text-white bg-black">Add to Cart</button> 
                                                )
                                            ):(
                                                <span className="text-center text-3xl font-bold text-red-600">Sold Out</span>
                                            )
                                        }
                                        {   inFavorite ? (
                                                <button onClick={()=>removeProductToFavorite(inFavorite)} className="flex justify-center py-2 px-5 border border-black rounded-full font-semibold">Remove to favorites <IconHeart/></button>
                                            ):(
                                                <button onClick={()=>addProductToFavorite(product.id)} className="flex justify-center py-2 px-5 border border-black rounded-full font-semibold">Add to favorites <IconHeart/></button>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </Layout>

    )

}