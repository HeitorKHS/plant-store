'use server'

import UserRepository from "./UserRepository";

export default async function logoutUser(){
    return await UserRepository.logoutUser();
}