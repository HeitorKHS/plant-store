'use client'

import LayoutAlternative from "@/app/components/template/LayoutAlternative";
import Link from "next/link";
import { IconBrandGoogle,  IconBrandLinkedin} from "@tabler/icons-react";
import useUser from "@/app/data/hooks/user/useUser";

export default function Page(){

    const {email, setEmail, password, setPassword, error, loginUser} = useUser();

    return(

        <LayoutAlternative>
            <div className="container mt-20">
                <div className="flex flex-col gap-10 md:w-1/3 mx-auto text-center p-5 bg-zinc-200 shadow-2xl rounded-md">
                    <h1 className="text-4xl font-bold text-primary">Sign In</h1>
                    <div className="flex flex-col gap-3">
                        <form onSubmit={loginUser} className="flex flex-col gap-3">
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E-mail" className="outline-none border border-gray-300 rounded-xl bg-gray-200 py-1 px-2 placeholder-gray-600"/>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="outline-none border border-gray-300 rounded-xl bg-gray-200 py-1 px-2 placeholder-gray-600"/>
                            {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
                            <Link href={"/"} className="text-gray-500">Forget your password ?</Link>
                            <button type="submit" className="w-1/2 mx-auto py-2 rounded-xl bg-black text-white">Login</button>
                        </form>
                        <span className="text-gray-600">or</span>
                        <div className="flex justify-center gap-5">
                            <IconBrandGoogle size={30}/>
                            <IconBrandLinkedin size={30}/>
                        </div>
                    </div>
                    <Link href={"/signup"} className="text-lg font-bold hover:underline hover:cursor-pointer">Create account</Link>
                </div>
            </div>
        </LayoutAlternative>

    )

}