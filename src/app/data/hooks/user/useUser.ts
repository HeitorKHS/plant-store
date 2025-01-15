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
    const [error, setError] = useState<string|null>(null);

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
        error,
        createUser: async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                await Backend.user.createUser(name, email, password);
                router.push("/signin");
            } catch (error:any) {
                if(error.message.includes('email')) setError("This email is already in use");
                else setError("Error creating the user. Please try again.");
            }
        },
        loginUser: async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                await Backend.user.loginUser(email, password);
                router.push("/"); 
            }catch (error: any) {
                setError(error.message || "Error logging in");
            }
        },
        logout: async () => {
            await Backend.user.logoutUser();
            setUser(null);
            router.push("/");
        }
    }

}