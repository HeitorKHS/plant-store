import Link from "next/link";
import { IconHeart, IconShoppingCart, IconUser, IconMenu2, IconX, IconArrowBadgeUpFilled } from "@tabler/icons-react";

import { useState } from "react";

import useUser from "@/app/data/hooks/user/useUser";
import Search from "./Search";

export default function Header(){

    const [navMobile, setNavMobile] = useState<boolean>(false);
    const [userMenu, setUserMenu] = useState<boolean>(false);

    const { user, logout } = useUser();

    return(

        <div className="sticky top-0 bg-white z-50">
            
            {/*Web*/}
            <div className="hidden lg:block container">
                <div className="grid grid-cols-3 items-center py-5">
                    <div className="text-primary text-3xl font-bold">
                        <Link href={"/"}>PlantS</Link>
                    </div>
                    <div className="mx-auto">
                        <Search/>
                    </div>
                    <div className="flex justify-end gap-5 text-primary">
                        <Link href={"/favorite"}><IconHeart className="cursor-pointer" size={30}/></Link>
                        <Link href={"/cart"}><IconShoppingCart className="cursor-pointer" size={30}/></Link>
                        {   user ? (
                                <div className="relative">
                                    <div onClick={()=>setUserMenu(!userMenu)} className="flex items-center gap-2 hover:cursor-pointer">
                                        <span className="text-lg">Olá, {user.name}</span>
                                        <IconArrowBadgeUpFilled size={20} className={`transform transition-transform duration-300 ${ userMenu ? 'rotate-180' : ''}`}/>
                                    </div>
                                    <div className={`${userMenu ? 'block' : 'hidden'} bg-white flex justify-center w-full absolute`}>
                                        <p onClick={logout} className="hover:cursor-pointer">Logout</p>
                                    </div>
                                </div>
                            ):(
                                <Link href={"/signin"}><IconUser className="cursor-pointer" size={30}/></Link>
                            )
                        }
                        
                    </div>
                </div>

                {/*Nav*/}
                <div className="flex justify-center gap-20 py-5 text-lg">
                    <Link className="hover:text-primary/50" href="/">Home</Link>
                    <Link className="hover:text-primary/50" href="/category/plant">Plants</Link>
                    <Link className="hover:text-primary/50" href="/category/substrate">Substrate</Link>
                    <Link className="hover:text-primary/50" href="/category/fertilizer">Fertilizer</Link>
                    <Link className="hover:text-primary/50" href="/category/tool">Tool</Link>
                </div>
            </div>

            {/*Mobile*/}
            <div className="block lg:hidden relative">
                <div>    
                    <div className="grid grid-cols-3 items-center p-5 text-primary">
                        <div>
                            <IconMenu2 onClick={()=>setNavMobile(!navMobile)} size={30}/>
                        </div>
                        <div className="text-3xl font-bold text-center">
                            <Link href="/">Plants</Link>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Link href={"/favorite"}><IconHeart size={30}/></Link>
                            <Link href={"/cart"}><IconShoppingCart size={30}/></Link>
                        </div>
                    </div>
                    <div className="flex justify-center py-2">
                        <Search/>
                    </div>
                </div>

                {/*Nav*/}
                <div className={` ${navMobile ? 'block' : 'hidden'} bg-zinc-100 absolute inset-0 w-full h-screen`}>
                    <div className="flex items-center justify-between p-5 border-b-2">
                        <IconX onClick={()=>setNavMobile(!navMobile)} size={30}/>
                        {  user ? (
                             <p onClick={()=>{setNavMobile(!navMobile); logout();}} className="font-bold text-red-600">Logout</p>                                   
                            ):(
                                <Link className="font-bold" href="/signin">Login</Link>
                            )
                        }
                    </div>
                    <div className="flex flex-col text-center w-full text-2xl">
                        <Link className="border-b-2 p-3" href="/">Home</Link>
                        <Link className="border-b-2 p-3" href="/category/plant">Plants</Link>
                        <Link className="border-b-2 p-3" href="/category/substrate">Substrate</Link>
                        <Link className="border-b-2 p-3" href="/category/fertilizer">Fertilizer</Link>
                        <Link className="border-b-2 p-3" href="/category/tool">Tool</Link>
                    </div>
                </div>
            </div>

        </div>

    )

}