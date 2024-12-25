'use server'

import ProductRepository from "./productRepository";

export default async function getNewProduct(){
    return await ProductRepository.getNewProduct();
}