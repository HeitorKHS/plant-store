'use client'

import Layout from "@/app/components/template/Layout";
import useCart from "@/app/data/hooks/cart/useCart";
import Image from "next/image";
import Link from "next/link";
import { IconTrashFilled, IconPlus, IconMinus } from "@tabler/icons-react";

export default function page(){

    const {cart, addToCart, removeToCart, removeProduct, checkout} = useCart();

    return(

        <Layout>
            <div className="container mt-20">
                <div className="text-center">
                    <h1 className="text-black text-2xl font-bold">Cart List</h1>
                    <p className="text-gray-500 font-semibold">See the items in your cart</p>
                </div>
                { cart && cart.cartItems.length > 0 ? (
                    <div className="flex flex-col md:flex-row gap-5 mt-10">
                        <div className="flex-grow space-y-5">                 
                            {
                                cart.cartItems.map((item)=>(
                                    <div key={item.product.id} className="flex flex-col md:flex-row gap-5 p-5 bg-gray-200 rounded-xl">
                                        <div className="md:w-1/2 flex gap-5">
                                            <div>
                                                <Image className="rounded-md" src="/assets/plant1.jpg" alt="plant" height={110} width={110}/>
                                            </div>
                                            <div className="space-y-5">         
                                                <h1 className="text-black text-xl font-semibold">{item.product.name}</h1>
                                                <div className="font-semibold">
                                                    <h1>Description: <span className="text-gray-600">{item.product.description}</span></h1>
                                                    <h1>Price: <span className="text-gray-600">${(item.product.price).toFixed(2)} Un.</span></h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-1/2 flex justify-between items-center">
                                            <div className="grid grid-cols-[1fr_2fr_1fr] rounded-md border-2 border-gray-700 items-center justify-items-center py-2 px-1">
                                                <IconMinus size={20} onClick={()=>{if(item.quantity > 1) removeToCart(item.id)}} className={`${item.quantity > 1 ? 'text-primary hover:cursor-pointer' : 'hover:cursor-not-allowed'}`} />
                                                {item.quantity}
                                                <IconPlus size={20} onClick={()=>{if(item.quantity < item.product.stock) addToCart(item.id)}} className={`${item.quantity < item.product.stock ? 'text-primary hover:cursor-pointer' : 'hover:cursor-not-allowed'}`} />
                                            </div>
                                            <div>
                                                <p className="text-xl text-primary font-bold">${(item.product.price*item.quantity).toFixed(2)}</p>            
                                            </div>                                
                                        </div>
                                        <div className="flex items-center justify-center md:ml-10">
                                            <IconTrashFilled onClick={()=>removeProduct(item.id)} className="hover:cursor-pointer" size={35} color="red"/>
                                        </div>  
                                    </div>       
                                ))
                            }
                        </div>
                        <div className="space-y-5">         
                            <div className="flex flex-col gap-5 p-5 bg-gray-200 rounded-xl">
                                <h1 className="text-xl font-bold">Total</h1>
                                <div className="flex gap-5 border-b border-black">
                                    <p>Value of products</p>
                                    <span className="font-semibold">${cart.total.toFixed(2)}</span>
                                </div>
                                <div className="flex gap-5 border-b border-black">
                                    <p>Discount amount</p>
                                    <span className="font-semibold">$0.00</span>
                                </div>
                                <div className="flex gap-5 border-b">
                                    <p>Total: </p>
                                    <span className="font-semibold">${cart.total.toFixed(2)}</span>
                                </div>    
                            </div>
                            <div className="flex flex-col gap-5 p-5 bg-gray-200 rounded-xl">
                                <button onClick={()=>checkout(cart.cartId)} className="py-2 font-semibold text-white bg-primary rounded-full">Checkout</button>
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
        </Layout>

    )

}