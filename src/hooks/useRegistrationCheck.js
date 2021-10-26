import { useState, useEffect } from "react";

import { ethers } from 'ethers';

import useContractObjectRepo from "./useContractObjectRepo.js";




const useRegistrationCheck = () => {

const [registration, setRegistration] = useState(false);

const {UserInteractionContract} = useContractObjectRepo();

 if (UserInteractionContract != undefined) {
    RegistrationCheck();
 }


    async function RegistrationCheck() {


    useEffect(() =>{
    try {UserInteractionContract.verifyRegistration().
    then((result) => setRegistration(result))}
    catch (error) {
        console.log(error)
    }
    },[])
}


       


    return {registration};
}

export default useRegistrationCheck;


