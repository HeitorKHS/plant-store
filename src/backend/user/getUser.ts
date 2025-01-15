'use server'

import UserRepository from "./UserRepository";

export default async function getUser(){
    return await UserRepository.getUser();
}