import { useState, useEffect } from "react";

import { utils, ethers } from 'ethers';

import useContractObjectRepo from "./useContractObjectRepo.js";




const useGetBalance = () => {

const [balance, setBalance] = useState(0);

const {UserInteractionContract} = useContractObjectRepo();


    useEffect(() =>{
        if (UserInteractionContract) {        
        UserInteractionContract.getDepositBalance()
        .then((result) => setBalance(utils.formatEther(result.toString()).toString()))
        .catch( (error) => {
            console.log(error)
        });}

    },[UserInteractionContract])

    console.log(balance, "BALANCE HOOK")

    return {balance, setBalance};
}

export default useGetBalance;


