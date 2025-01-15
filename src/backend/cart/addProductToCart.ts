'use server'

import CartRepository from "./CartRepository";

export default async function addProductToCart(idProduct: number){
    return await CartRepository.addProductToCart(idProduct);
}