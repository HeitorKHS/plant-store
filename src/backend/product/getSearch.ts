'use server'

import ProductRepository from "./productRepository";

export default async function getSearch(search: string, page: number, order: string, type: string){
    return await ProductRepository.getSearch(search, page, order, type);
}