import { React } from 'react';
import { ethers } from 'ethers';
import './BuyAlbumButton.css';

import UserInteraction from '../artifacts/contracts/UserInteraction.sol/UserInteraction.json';


// need to import vault contract address




const BuyAlbumButton = ({mainAccount}) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);

    const userInteractionContractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

//console.log(signer, 'signer')

    const UserInteractionContract = new ethers.Contract(userInteractionContractAddress, UserInteraction.abi, signer);


    const BuyAlbum = async () => {
        //await UserInteractionContract.Buy(1, 1, {value: 1000000})
        try {await UserInteractionContract.Buy(1 , 1, {value : 1000000})
        .then((result) => console.log(result))}
        catch (error) {
            console.log(error)
        }

    
    }
 

  
    


    return (
        <div>
            <button className="buyAlbumButton" id="buyButton" onClick={BuyAlbum}
              >
              
              {mainAccount ? "Buy Album for $10" : "Please connect to MetaMask to buy album!"}
              
            </button>
        </div>
    )
}

export default BuyAlbumButton;
