import { useState, React } from 'react';
import './BuyAlbumButton.css';





const BuyAlbumButton = ({
    mainAccount, 
    balance, 
    purchased, 
    setPurchased, 
    OwnershipTokenContract, 
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

    const BuyAlbum = async() => {
        console.log(balance, 'PRICE BALANCE')

            let tx = await UserInteractionContract.Buy(1 , {value : 2621229059106300})
            .then(setIsLoading(true))
            .catch(() => setIsLoading(false));
            
            if (tx) {
            let receipt = await tx.wait();
              if (receipt) {
                OwnershipTokenContract.safeMint(mainAccount)
                .then(setIsLoading(false))
                .then(GetBalance())
                .then(Ownership());
              }
            }    
   
    }

    const Ownership = () => {
        UserInteractionContract.on("AlbumPurchased" , (uint, success) => {
            console.log(uint, success, "purchase log");
                if (success) {
                    UserInteractionContract.getAlbumOwnership()
                    .then((result) => (setPurchased(result))).
                    then(setIsLoading(false))
                    
                }
            }
        )       
    }
 


    return (
        <div>
            <div style={{paddingTop : '120px'}}>
                {purchased ?
                <button className="standardButton" id="boughtButton">            
                    {"Album Purchased! Listen at will"} 
                    {Ownership()}         
                </button>
                :
                <button className="standardButton" id="buyButton" onClick={BuyAlbum}>            
                    {"Buy Album!"}
                    {<p style={{fontSize : "20px"}}>.002621 Eth</p>}           
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
