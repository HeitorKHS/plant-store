'use server'

import userRepository from "./userRepository";

export default async function loginUser(email: string, password: string){
    return await userRepository.loginUser(email, password);
}