import { useState, useEffect } from "react";

import { ethers } from 'ethers';



import UserInteraction from '../artifacts/contracts/UserInteraction.sol/UserInteraction.json';






const ContractObjectRepo = () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);

    //const [RootContract, setRootContract] = useState('');
    
    const [UserInteractionContract, setUserInteractionContract] = useState('');
    
    

    //const [signer, setSigner] = useState('');

    //const [provider, setProvider] = useState('');

    useEffect(()=> {
        if (provider) {
            contractObjects();
          } else {
            alert("please connect to Metamask")
          }
        
        
          async function contractObjects() {

            
            //const rootContractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
            //const RootContractObject = await new ethers.Contract(rootContractAddress, RootContract.abi, signer);
            //setRootContract(RootContractObject);

             
            
            
            //User Interaction Contract + Root Contract

            const userInteractionContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            const UserInteractionContractObject = await new ethers.Contract(userInteractionContractAddress, UserInteraction.abi, signer);
            setUserInteractionContract(UserInteractionContractObject);
            

        }

    },[])
    return {UserInteractionContract};
}

export default ContractObjectRepo;


