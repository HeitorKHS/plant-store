'use server'

import UserRepository from "./UserRepository";

export default async function loginUser(email: string, password: string){
    return await UserRepository.loginUser(email, password);
}