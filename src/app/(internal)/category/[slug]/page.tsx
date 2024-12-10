'use client'

import { use } from "react"; //Resolve asynchronous promises
import { useSearchParams } from "next/navigation";
import useCategory from "@/app/data/hooks/category/useCategory";
import { IconBaselineDensityMedium } from "@tabler/icons-react";

import ListProductItem from "@/app/components/home/ListProductItem";
import Layout from "@/app/components/template/Layout";

export default function page({ params }: { params: Promise<{ slug: string }> }){

    const { slug } =  use(params);
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') || 1);

    const { products, total, totalPages, changePage } = useCategory({slug:slug, page: page});

    return(

        <Layout>
            <div className="container mt-20">
                { products ? (
                        <div>
                            <div className="flex justify-between p-5">
                                <div className="font-semibold">
                                    <span>({total}) Products Found</span>
                                </div>
                                <div className="flex gap-10">
                                    <div>
                                        <span className="flex gap-2 items-center cursor-pointer">Filter <IconBaselineDensityMedium size={15} /></span>
                                    </div>      
                                    <div>
                                        <select className="cursor-pointer">
                                            <option value="featured">Featured</option>
                                            <option value="newest">Newest</option>
                                            <option value="lowprice">Low Price</option>
                                            <option value="highprice">High Price</option>
                                            <option value="bestsellers">Best Sellers</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2">
                                {
                                    products.map((product)=>(
                                        <ListProductItem key={product.id} product={product}/>
                                    ))
                                }
                            </div>

                            {/*temporary navigation page*/}
                            <div className="flex justify-center gap-5 mt-10">
                                <button className={`hover:underline ${page > 1 ? '':'invisible'}`} onClick={()=>changePage(page-1)}>Prev</button>                    
                                {
                                    [0,1,2,3].map((aux)=>{

                                        const startPage = Math.max(1, page - 1);
                                        const endPage = Math.min(startPage + 4 - 1, totalPages);
                                        const adjustedStartPage = Math.max(1, endPage - 4 + 1);

                                        const pages = adjustedStartPage+aux;
                                        if (pages > totalPages) return null;                                      
                                        return (
                                            <button
                                                key={pages}
                                                onClick={() => changePage(pages)}
                                                className={`h-10 w-10 rounded-full ${pages === page ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white transform duration-300'}`}
                                            >
                                            {pages}
                                            </button>
                                        );
                                    })
                                }
                                <button className={`hover:underline ${page < totalPages ? '' : 'invisible'}`} onClick={()=>changePage(page+1)}>Next</button>
                            </div>
                        </div>           
                    ):(
                        <div className="text-black text-center space-y-10">
                            <h1 className="text-7xl font-bold">"Sorry"</h1>
                            <p className="text-2xl font-semibold">Product not found.</p>
                        </div>
                    )
                }
            </div>
        </Layout>    

    )

}