'use server'

import CartRepository from "./CartRepository";

export default async function addQuantity(idCartItem: number){
    return await CartRepository.addQuantity(idCartItem);
}