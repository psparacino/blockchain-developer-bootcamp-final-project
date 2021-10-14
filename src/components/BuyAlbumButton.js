import { React } from 'react';
import './BuyAlbumButton.css';

// need to import vault contract address

import { ethers } from 'ethers';


const BuyAlbumButton = ({mainAccount, signer, provider}) => {


    const BuyAlbum = async () => {
        console.log(signer, "MAIN ACCOUNT CHECK");
        const tx = ({
            //to: owner,
            to: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,
            value: ethers.utils.parseEther("1.0")
        });
        const txHash = signer.sendTransaction({
            method: 'eth-sendTransaction',
            params : [tx],
        })  
        .then((txHash) => console.log('txHash', txHash))
        .catch((error) => console.error);
       
        
    }
    
 
    console.log(mainAccount);


    return (
        <div>
            <button className="buyAlbumButton" id="connectButton" onClick={BuyAlbum}
              >
              
              {mainAccount ? "Buy Album" : "Please connect to MetaMask to buy album!"}
              
            </button>
        </div>
    )
}

export default BuyAlbumButton;
