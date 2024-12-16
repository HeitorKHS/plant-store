'use client'

import { use } from "react"; //Resolve asynchronous promises
import { useSearchParams } from "next/navigation";
import useCategory from "@/app/data/hooks/category/useCategory";
import { IconBaselineDensityMedium, IconSquareFilled, IconSquare } from "@tabler/icons-react";

import ListProductItem from "@/app/components/home/ListProductItem";
import Layout from "@/app/components/template/Layout";
import Navigation from "@/app/components/navigation/Navigation";

export default function page({ params }: { params: Promise<{ slug: string }> }){

    const { slug } =  use(params);
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const order = String(searchParams.get('order') || '' );
    const type = String(searchParams.get('type') || '' )
    const { products, total, totalPages, filter, typesArray, changePage, orderBy, selectType, openFilter } = useCategory({slug:slug, page: page, order: order, type: type});

    return(

        <Layout>
            <div className="container mt-20">
                { products ? (
                        <div>
                            <div className="flex flex-col items-center md:flex-row md:justify-between gap-2 p-5">
                                <div className="font-semibold">
                                    <span>({total}) Products Found</span>
                                </div>
                                <div className="flex gap-10">
                                    <div>
                                        <span onClick={openFilter} className="flex gap-2 items-center cursor-pointer">Filter <IconBaselineDensityMedium size={15} /></span>
                                    </div>      
                                    <div>
                                        <select className="cursor-pointer" onChange={(e)=>orderBy(e.target.value)} value={order}>
                                            <option value="featured">Featured</option>
                                            <option value="newest">Newest</option>
                                            <option value="lowprice">Low Price</option>
                                            <option value="highprice">High Price</option>
                                            <option value="bestsellers">Best Sellers</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex">
                                <div className={`${filter ? 'block' : 'hidden'} p-5 flex flex-col gap-5 items-center`}>
                                    <h1 className="text-xl font-bold">Types</h1>
                                    <ul className="space-y-3">
                                        { 
                                            typesArray.map((item, index)=>(
                                                <li key={index} className="flex items-center gap-4 cursor-pointer" onClick={()=>selectType(item.type_slug)}>                                       
                                                    {type === item.type_slug ? <IconSquareFilled size={20}/>:<IconSquare size={20}/>}
                                                    {item.type}     
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="flex-grow grid md:grid-cols-2 md:grid-rows-3">
                                    {
                                        products.map((product)=>(
                                            <ListProductItem key={product.id} product={product}/>
                                        ))
                                    }
                                </div>
                            </div>


                            {/*Navigation*/}
                            <Navigation page={page} totalPages={totalPages} changePage={changePage}/>
                        </div>           
                    ):(
                        <div className="text-black text-center space-y-10">
                            <h1 className="text-7xl font-bold">"Sorry"</h1>
                            <p className="text-2xl font-semibold">The page you are looking for was not found.</p>
                        </div>
                    )
                }
            </div>
        </Layout>    

    )

}