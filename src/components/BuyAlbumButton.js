import { useState, React } from 'react';
import { ethers } from 'ethers';
import './BuyAlbumButton.css';





const BuyAlbumButton = ({mainAccount, UserInteractionContract}) => {

    const [ownershipStatus, setOwnershipStatus] = useState(false);


    const BuyAlbum = async () => {
        //await UserInteractionContract.Buy(1, 1, {value: 1000000})
        try {await UserInteractionContract.Buy(1 , {value : 2621229059106300})
        .then((result) => console.log(result))}
        catch (error) {
            console.log(error)
        }
        Ownership();
    }


    const Ownership = () => {
        //await UserInteractionContract.Buy(1, 1, {value: 1000000})
        try { UserInteractionContract.getAlbumOwnership()
        .then((result) => setOwnershipStatus(result))}
        catch (error) {
            console.log(error)
        }  
        
    }
 


    return (
        <div>
            {ownershipStatus == true ?
            <button className="buyAlbumButton" id="buyButton">            
              {"Album Purchased! Listen at will"}           
            </button>
            :
            <button className="buyAlbumButton" id="buyButton" onClick={BuyAlbum}>            
              {"Buy Album!"}           
            </button>}
            {console.log(ownershipStatus, "ownership")}
        </div>
    )
}

export default BuyAlbumButton;
