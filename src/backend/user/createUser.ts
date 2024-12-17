'use server'

import userRepository from "./userRepository";

export default async function createUser(name: string, email: string, password: string){
    return await userRepository.createUser(name, email, password);
}