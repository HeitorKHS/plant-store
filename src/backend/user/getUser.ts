'use server'

import userRepository from "./userRepository";

export default async function getUser(){
    return await userRepository.getUser();
}