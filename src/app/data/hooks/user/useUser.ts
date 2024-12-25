import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Backend from "@/backend";
import { User } from "@/core/models/User";

export default function useUser(){

    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 
    const [user, setUser] = useState<User|null>(null);

    useEffect(()=>{
        Backend.user.getUser().then(setUser);
    },[])

    return{
        user,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        createUser: async (e: React.FormEvent) => {
            e.preventDefault();
            await Backend.user.createUser(name, email, password);
            router.push("/signin");
        },
        loginUser: async (e: React.FormEvent) => {
            e.preventDefault();
            await Backend.user.loginUser(email, password);
            router.push("/");
        },
        logout: async () => {
            await Backend.user.logoutUser();
            setUser(null);
            router.push("/");
        }
    }

}