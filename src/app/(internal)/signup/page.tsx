'use client'

import LayoutAlternative from "@/app/components/template/LayoutAlternative"
import useUser from "@/app/data/hooks/user/useUser";
import { IconBrandGoogle,  IconBrandLinkedin} from "@tabler/icons-react";
import Link from "next/link";

export default function Page(){

    const {name, setName, email, setEmail, password, error, setPassword, createUser} = useUser();

    return(

        <LayoutAlternative>
            <div className="container mt-20">
                <div className="flex flex-col gap-10 md:w-1/3 mx-auto text-center p-5 bg-zinc-200 shadow-2xl rounded-md">
                    <h1 className="text-4xl font-bold text-primary">Sign Up</h1>
                    <div className="flex flex-col gap-3">
                        <form onSubmit={createUser} className="flex flex-col gap-3">
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className="outline-none border border-gray-300 rounded-xl bg-gray-200 py-1 px-2 placeholder-gray-600"/>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E-mail" className="outline-none border border-gray-300 rounded-xl bg-gray-200 py-1 px-2 placeholder-gray-600"/>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="outline-none border border-gray-300 rounded-xl bg-gray-200 py-1 px-2 placeholder-gray-600"/>
                            {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
                            <button type="submit" className="w-1/2 mx-auto py-2 rounded-xl bg-black text-white">Sign Up</button>
                        </form>
                        <span className="text-gray-600">or</span>
                        <div className="flex justify-center gap-5">
                            <IconBrandGoogle size={30}/>
                            <IconBrandLinkedin size={30}/>                       
                        </div>                       
                    </div>
                    <Link href={"/signin"} className="text-lg font-bold hover:underline hover:cursor-pointer">Login</Link>
                </div>
            </div>
        </LayoutAlternative>

    )

}