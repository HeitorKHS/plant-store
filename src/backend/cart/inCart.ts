'use server'

import CartRepository from "./CartRepository";

export default async function inCart(idProduct: number){
    return await CartRepository.inCart(idProduct);
}