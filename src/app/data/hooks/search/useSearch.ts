import { useEffect, useState } from "react";
import Backend from "@/backend";
import { Product } from "@/core/models/Product";
import { useRouter } from "next/navigation";

export interface useSearchProps{
    search: string,
    page: number,
    order: string,
    type: string,
}

export default function useSearch(props: useSearchProps){

    const router = useRouter();

    const [products, setProducts] = useState<Product[]|null>(null);
    const [total, setTotal] = useState<number>(0);
    const [filter, setFilter] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [typesArray, setTypesArray] = useState<{type:string, type_slug: string}[]>([]);

    useEffect(()=>{
        getSearch();
    },[props.search, props.page, props.order, props.type])

    async function getSearch(){
        const fetchedProducts = await Backend.product.getSearch(props.search, props.page, props.order, props.type);
        if(fetchedProducts){
            setProducts(fetchedProducts.products);
            setTotal(fetchedProducts.total);
            setTotalPages(fetchedProducts.totalPages);
            setTypesArray(fetchedProducts.types);
        } else {
            setProducts(null);
        }
    }

    return{
        products,
        total,
        totalPages,
        filter,
        typesArray,
        changePage:(page: number)=>{
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('page', String(page));
            router.push(String(currentUrl));
        },
        orderBy:(order: string)=>{
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('order', order);
            router.push(String(currentUrl));
        },
        selectType:(type: string)=>{
            if(type === props.type){
                router.push(`/search?search=${props.search}`);
            } else{
                router.push(`/search?search=${props.search}&type=${type}`);
            }
        },
        openFilter:()=>setFilter(!filter), 
    }

}