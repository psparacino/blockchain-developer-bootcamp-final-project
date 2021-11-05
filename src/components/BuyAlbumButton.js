import { useState, React } from 'react';
import { ethers } from 'ethers';
import './BuyAlbumButton.css';
import useGetBalance from '../hooks/useGetBalance';





const BuyAlbumButton = ({mainAccount, purchased, setPurchased, OwnershipTokenContract, UserInteractionContract, GetBalance}) => {



    const BuyAlbum = () => {
        //await UserInteractionContract.Buy(1, 1, {value: 1000000})
        UserInteractionContract.Buy(1 , {value : 2621229059106300})
        .then(OwnershipTokenContract.safeMint(mainAccount))
        .then(Ownership());
   

        Ownership();
        GetBalance();
        
    }

    const Ownership = () => {
        //await UserInteractionContract.Buy(1, 1, {value: 1000000})
        UserInteractionContract.on("AlbumPurchased" , (uint, success) => {
            console.log(uint, success, "purchase log");
                if (success) {
                    UserInteractionContract.getAlbumOwnership()
                    .then((result) => (setPurchased(result)));
                    
                }
            }
        )       
    }
 


    return (
        <div>
            {purchased ?
            <button className="standardButton" id="buyButton">            
              {"Album Purchased! Listen at will"}           
            </button>
            :
            <button className="standardButton" id="buyButton" onClick={BuyAlbum}>            
              {"Buy Album!"}           
            </button>}
            {console.log(purchased, "ownership")}
        </div>
    )
}

export default BuyAlbumButton;
