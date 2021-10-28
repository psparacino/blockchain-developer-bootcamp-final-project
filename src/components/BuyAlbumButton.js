import { useState, React } from 'react';
import { ethers } from 'ethers';
import './BuyAlbumButton.css';





const BuyAlbumButton = ({mainAccount, purchased, setPurchased, OwnershipTokenContract, UserInteractionContract}) => {



    const BuyAlbum = async () => {
        //await UserInteractionContract.Buy(1, 1, {value: 1000000})
        await UserInteractionContract.Buy(1 , {value : 2621229059106300});

        Ownership();
        OwnershipTokenContract.safeMint(mainAccount);
    }


    const Ownership = () => {
        //await UserInteractionContract.Buy(1, 1, {value: 1000000})
        try { UserInteractionContract.getAlbumOwnership()
        .then((result) => setPurchased(result))}
        catch (error) {
            console.log(error)
        }  
        
    }
 


    return (
        <div>
            {purchased ?
            <button className="buyAlbumButton" id="buyButton">            
              {"Album Purchased! Listen at will"}           
            </button>
            :
            <button className="buyAlbumButton" id="buyButton" onClick={BuyAlbum}>            
              {"Buy Album!"}           
            </button>}
            {console.log(purchased, "ownership")}
        </div>
    )
}

export default BuyAlbumButton;
