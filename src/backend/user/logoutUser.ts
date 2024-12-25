'use server'

import userRepository from "./userRepository";

export default async function logoutUser(){
    return await userRepository.logoutUser();
}