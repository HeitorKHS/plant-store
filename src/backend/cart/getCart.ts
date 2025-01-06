'use server'

import cartRepository from "./cartRepository";

export default async function(){
    return await cartRepository.getCart();
}