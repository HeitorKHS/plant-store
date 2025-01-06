'use server'

import cartRepository from "./cartRepository";

export default async function addProduct(idProduct: number){
    return await cartRepository.addProduct(idProduct);
}