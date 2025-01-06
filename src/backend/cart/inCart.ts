'use server'

import cartRepository from "./cartRepository";

export default async function(idProduct: number){
    return await cartRepository.inCart(idProduct);
}