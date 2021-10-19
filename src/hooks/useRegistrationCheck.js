import { useState, useEffect } from "react";

import { ethers } from 'ethers';

import ContractObjectRepo from "./ContractObjectRepo";




const useRegistrationCheck = () => {

const [registration, setRegistration] = useState(false);

const {UserInteractionContract} = ContractObjectRepo();

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


