'use client'

import Layout from "@/app/components/template/Layout";

import Image from "next/image";
import Link from "next/link";
import { IconTrashFilled } from "@tabler/icons-react";

import useFavorite from "@/app/data/hooks/favorite/useFavorite";

export default function Page(){

    const { favorite, loading, removeProductToFavorite } = useFavorite();

    return(

        <Layout>
            <div className="container mt-20">
                { loading ? (
                        <div className="text-black text-center space-y-10">
                            <h1 className="text-7xl font-bold">&quot;Loading ...&quot;</h1>
                        </div>
                    ):( 
                        <div>
                            <div className="text-center">
                                <h1 className="text-black text-2xl font-bold">Favorite List</h1>
                                <p className="text-gray-500 font-semibold">See the items in your favorite</p>
                            </div>
                            {   favorite && favorite.length > 0 ? (
                                    <div className="mt-20 space-y-5">
                                        {   favorite.map((item)=>(                       
                                                <div key={item.product.id} className="flex gap-5 p-5 bg-gray-200 rounded-xl">
                                                    <div className="hidden md:block">
                                                        <Image className="rounded-md" src="/assets/plant1.jpg" alt="plant" height={110} width={110}/>
                                                    </div>
                                                    <div className="flex flex-col flex-grow gap-3 md:border-r-2 border-gray-500">
                                                        <Link href={`/product/${item.product.slug}`} className="text-black text-xl font-semibold">{item.product.name}</Link>
                                                        <div>
                                                            <h1>Description: <span className="text-gray-600">{item.product.description}</span></h1>
                                                            <h1>Stock: <span className="text-gray-600">{item.product.stock}</span></h1>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center gap-5">
                                                        <div className="flex p-1 gap-2 bg-gray-300 items-center">
                                                            <div className="bg-primary/20 p-2">
                                                                <p className="font-bold text-primary text-xl">-10%</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold line-through">${(item.product.price).toFixed(2)}</p>
                                                                <p className="text-xl text-primary font-bold">${((item.product.price)*0.90).toFixed(2)}</p>            
                                                            </div>
                                                        </div>                                     
                                                        <div>
                                                            <IconTrashFilled onClick={()=>removeProductToFavorite(item.id)} className="hover:cursor-pointer" size={35} color="red"/>
                                                        </div>    
                                                    </div>
                                                </div>                              
                                            ))}
                                    </div>
                                ):(
                                    <div className="mt-20 text-center">
                                        <h1 className="text-black text-xl font-bold">You do not have any favorite products.</h1>
                                    </div>
                                )
                            }  
                        </div>
                    )
                }
            </div>
        </Layout>
    )

}


              