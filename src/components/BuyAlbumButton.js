import { useState, React } from 'react';
import { ethers, utils } from 'ethers';
import './BuyAlbumButton.css';
import useGetBalance from '../hooks/useGetBalance';





const BuyAlbumButton = ({mainAccount, balance, purchased, setPurchased, OwnershipTokenContract, needMoney, setNeedMoney, UserInteractionContract, GetBalance}) => {

    const [albumPurchases, setAlbumPurchases] = useState(0);

    UserInteractionContract.getTotalAlbumsPurchased()
        .then((result) => setAlbumPurchases(result.toString()));

    const BuyAlbum = () => {

        console.log(utils.parseEther(balance).toString(), "balance")
        if (utils.parseEther(balance).toString() > "2621229059106328") {
            setNeedMoney(false);
            UserInteractionContract.Buy(1 , {value : 2621229059106328})
            .then(OwnershipTokenContract.safeMint(mainAccount))
            .then(Ownership());
   

        
        GetBalance();

    } else {
        setNeedMoney(true);
    }
        
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
            <div>
                <h5>
                    Total Albums Purchased: {albumPurchases}
                </h5>       
            </div>
        </div>
    )
}

export default BuyAlbumButton;
