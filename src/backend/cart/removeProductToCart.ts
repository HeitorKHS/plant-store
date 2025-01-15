'use server'

import CartRepository from "./CartRepository";

export default async function removeProductToCart(idCartItem: number){
    return await CartRepository.removeProductToCart(idCartItem);
}