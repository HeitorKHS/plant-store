'use client'

import Image from "next/image";
import { IconTrashFilled, IconPlus, IconMinus } from "@tabler/icons-react";
import Link from "next/link";

import useCart from "@/app/data/hooks/cart/useCart";

import Layout from "@/app/components/template/Layout";

export default function Page(){

    const { cart, loading, addQuantity, removeQuantity, removeProductToCart, checkout } = useCart();

    return(

        <Layout>
            <div className="container mt-20">
                {   loading ? (
                        <div className="text-black text-center space-y-10">
                            <h1 className="text-7xl font-bold">&quot;Loading ...&quot;</h1>
                        </div>
                    ):(
                        <div>
                            <div className="text-center">
                                <h1 className="text-black text-2xl font-bold">Cart List</h1>
                                <p className="text-gray-500 font-semibold">See the items in your cart</p>
                            </div> 
                            {   cart && cart.cartItem.length > 0 ? (
                                    <div className="flex flex-col lg:flex-row gap-5">
                                        <div className="lg:w-2/3 space-y-5 py-5 px-5 bg-gray-200/60 rounded-md">
                                            { cart.cartItem.map((item)=>(
                                                <div key={item.id} className="flex flex-col md:flex-row gap-10 py-5">
                                                    <div className="md:w-1/2 flex gap-5">
                                                        <Image className="rounded-md" src="/assets/plant1.jpg" alt="plant" height={110} width={110}/>
                                                        <div className="flex flex-col gap-5">         
                                                            <h1 className="text-black text-lg font-semibold">{item.product.name}</h1>
                                                            <div className="font-semibold">
                                                                <h1>Description: <span className="text-gray-600">{item.product.description}</span></h1>
                                                                <h1>Price: <span className="text-gray-600">${(item.product.price).toFixed(2)} Un.</span></h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="md:w-1/2 flex flex-col gap-5">
                                                        <div className="flex w-full justify-between items-center">
                                                            <div className="flex items-center rounded-md border-2 border-gray-700 py-2 px-1">
                                                                <IconMinus size={18} onClick={()=>{if(item.quantity > 1) removeQuantity(item.id)}} className={`${item.quantity > 1 ? 'text-primary hover:cursor-pointer' : 'hover:cursor-not-allowed'}`} />
                                                                <span className="w-10 text-center">{item.quantity}</span>
                                                                <IconPlus size={18} onClick={()=>{if(item.quantity < item.product.stock) addQuantity(item.id)}} className={`${item.quantity < item.product.stock ? 'text-primary hover:cursor-pointer' : 'hover:cursor-not-allowed'}`} />
                                                            </div>
                                                            <div>
                                                                <p className="text-lg text-primary font-bold">${(item.product.price*item.quantity).toFixed(2)}</p>            
                                                            </div>  
                                                        </div>
                                                        <div className="flex justify-center md:justify-start">
                                                            <span onClick={()=>removeProductToCart(item.id)} className="flex gap-2 text-red-700 font-semibold hover:cursor-pointer"><IconTrashFilled size={20}/>Remove</span>     
                                                        </div>                                 
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="lg:w-1/3 space-y-5">
                                            <div className="flex flex-col py-5 px-5 bg-gray-200/60 rounded-md">
                                                <h1 className="text-xl font-bold px-1">My Cart</h1>
                                                <div className="flex py-2 px-1 border-b border-gray-700">
                                                    <p className="text-gray-700">Value of products:</p>
                                                    <span className="flex-grow font-semibold text-end">${cart.total.toFixed(2)}</span>
                                                </div>
                                                <div className="flex py-2 px-1 border-b border-gray-700">
                                                    <p className="text-gray-700">Discount amount</p>
                                                    <span className="flex-grow font-semibold text-end">$0.00</span>
                                                </div>
                                                <div className="flex py-4 px-1">
                                                    <p className="text-gray-700">Total: </p>
                                                    <span className="flex-grow font-semibold text-end">${cart.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-5 py-5 px-5 bg-gray-200/60 rounded-md">
                                                <button onClick={()=>checkout()} className="py-2 font-semibold text-white bg-primary rounded-full">Checkout</button>
                                                <Link href={"/"} className="text-center text-primary font-semibold hover:underline">Continue Shopping</Link>
                                            </div>    
                                        </div>
                                    </div>
                                ):(
                                    <div className="mt-20 text-center">
                                        <h1 className="text-black text-xl font-bold">You do not have any cart products.</h1>
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