'use server'

import ProductRepository from "./ProductRepository";

export default async function getTopSelling(){
    return await ProductRepository.getTopSelling();
}