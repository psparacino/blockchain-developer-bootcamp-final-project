import { useState, React } from 'react';
import { ethers, utils } from 'ethers';
import './BuyAlbumButton.css';
import useGetBalance from '../hooks/useGetBalance';





const BuyAlbumButton = ({
    mainAccount, 
    balance, 
    purchased, 
    setPurchased, 
    OwnershipTokenContract, 
    needMoney, 
    setNeedMoney, 
    setIsLoading, 
    UserInteractionContract, 
    GetBalance}) => {

    const [albumPurchases, setAlbumPurchases] = useState(0);

    UserInteractionContract.getTotalAlbumsPurchased()
        .then((result) => setAlbumPurchases(result.toString()));

    UserInteractionContract.getAlbumOwnership()
        .then((result) => (setPurchased(result)));
    
    if (balance > 0.026212290591062299) {
        setNeedMoney(false)
    }

    const BuyAlbum = () => {
        console.log(balance, 'PRICE BALANCE')
        //console.log(typeof(utils.formatEther(parseInt("26212290591062299", 10))), "PRICEbalance")
        if (balance > 0.026212290591062299) {
            setIsLoading(true);
            console.log(needMoney, "needMoney")
            console.log(balance, "buyAlbumbalance")
            UserInteractionContract.Buy(1 , {value : 2621229059106300})
            .then(OwnershipTokenContract.safeMint(mainAccount))
            .then(Ownership());
   

        
        GetBalance();

    } else {
        setNeedMoney(true);
    }
        
    }

    const Ownership = () => {
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
                {setIsLoading(false)}         
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
