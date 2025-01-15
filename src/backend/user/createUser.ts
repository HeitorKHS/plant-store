'use server'

import UserRepository from "./UserRepository";

export default async function createUser(name: string, email: string, password: string){
    return await UserRepository.createUser(name, email, password);
}