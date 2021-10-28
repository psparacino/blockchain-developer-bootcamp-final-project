import { useState, useEffect } from "react";

import { ethers } from 'ethers';

import useContractObjectRepo from "./useContractObjectRepo.js";




const useAlbumPurchaseConfirm = () => {

const [purchased, setPurchased] = useState(false);

const {UserInteractionContract} = useContractObjectRepo();


    useEffect(() =>{
        if (UserInteractionContract) {        
        UserInteractionContract.getAlbumOwnership()
        .then((result) => {
            setPurchased(result);
            console.log(result, "purchase result")

        })
        .catch((error) => console.log(error))
    }

    },[UserInteractionContract])



    return {purchased, setPurchased};
}

export default useAlbumPurchaseConfirm;


