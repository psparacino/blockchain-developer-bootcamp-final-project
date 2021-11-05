import { useState, useEffect } from "react";

import useContractObjectRepo from "./useContractObjectRepo.js";




const useRegistrationCheck = () => {

const [registration, setRegistration] = useState(false);

const {UserInteractionContract} = useContractObjectRepo();


    useEffect(() =>{
        if (UserInteractionContract) {        
        UserInteractionContract.verifyRegistration()
        .then((result) => {
            setRegistration(result);
            console.log(result, "registration result")

        })
        .catch((error) => console.log(error))
    }

    },[UserInteractionContract])



    return {registration, setRegistration};
}

export default useRegistrationCheck;


