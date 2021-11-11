import React, { useEffect, useState } from 'react';
import { utils, ethers } from 'ethers';
import AudioPlayer from  './components/AudioPlayer.jsx';
import tracks from "./tracks";


//styles
import './AudioMain.css';

import './DepositWithdrawal.css';


//components

import BuyAlbumButton from './components/BuyAlbumButton.js';

import PleaseRegister from './components/PleaseRegister.jsx';

import PleaseConnect from './components/PleaseConnect.jsx'; 

//import DepositWithdrawal from './AudioMainComponents/DepositWithdrawal.js';

//Contracts


const AudioMain = ({
        mainAccount, 
        balance, 
        setBalance, 
        purchased, 
        setPurchased,
        registration,
        setRegistration, 
        UserInteractionContract, 
        OwnershipTokenContract}) => {

    const [trackNumber, setTrackNumber] = useState(0);

    const [currentTrack, setCurrentTrack] = useState(0);

    const [needMoney, setNeedMoney] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    
    //console.log(UserInteractionContract, "Contract Object");
    
    async function getEthPrice() {
        if (mainAccount)
        {await UserInteractionContract.getEthPriceToday().
        then(result => console.log(result.toString(), "promise return"))}
        
    }
    //getEthPrice();

    useEffect(() =>{
        if (mainAccount) {        
        UserInteractionContract.verifyRegistration()
        .then((result) => {
            setRegistration(result);
            console.log(result, "registration result")

        })
        .catch((error) => console.log(error))
    }

    },[mainAccount])



    async function GetBalance() {
        UserInteractionContract.on("AmountDeposited" , (address, uint, success) => {
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))))
                    .then(setIsLoading(false))
                    console.log(balance, "DEPOSIT EVENT");
                }
                if (balance > 0.026212290591062299) {
                    setNeedMoney(false)
                }
            } 
        )

        UserInteractionContract.on("WithdrawalComplete" , (address, uint, balance, success) => {
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))))
                    .then(setIsLoading(false))
                    console.log(balance, "WITHDRAWAL EVENT");
                }
            } 
        )


        UserInteractionContract.on("SongPlayed" , (songID, success) => {
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))))
                    .then(setIsLoading(false))
                    console.log(balance, "PLAY EVENT");
                }
            } 
        )
    }

    const AlbumStats = () => {
        
        const [totalStats, setTotalStats] = useState(0);
        const [stats, setStats] = useState(0);
        const [userStats, setUserStats] = useState(0);

        function songTitle(currentTrack) {
            if (currentTrack == 0) {
                return 'Shenanigans'
            } else if (currentTrack == 1) {
                return 'InterDweller'
            } else {
                return 'La Storia'
            }
        }

        UserInteractionContract.getPlayCount(currentTrack)
            .then((result) => setStats(result.toString()));
            //need to fix above to access state variable in contract
        
    
        UserInteractionContract.getAggregatePlayCount(0, 1, 2)
        .then((result) => setTotalStats(result.toString()));

        UserInteractionContract.getUserPlayCount(1, currentTrack)
        .then((result) => setUserStats(result.toString()));
 
        return (
            <div className='stats'>
                    
                    <table className='statsTable'> 
                    <tr>
                        <th className="noBorder"> <h3>Stats</h3> </th>
                    </tr>
                    <tr>
                        <td>Total Plays (all users/all songs): {totalStats}</td>
                    </tr> 
                    <tr>
                        <td>{songTitle(currentTrack)} Total Play Count: {stats}</td>  
                    </tr>
               
                        <td>{songTitle(currentTrack)} User Play Count: {userStats}</td>  
                   
                </table>       
            </div>
        
        )
    }

  
    const DepositWithdrawal = () => {

        const [inputAmount, setInputAmount] = useState(0);

        const [nonZero, setNonZero] = useState(false);

        const handleSubmit = (event) => {
            event.preventDefault();
          } 

        const onChange = (event) => {
            const amount = event.target.value;
            if (amount == 0 || null) {
                setInputAmount(0);

            } else {
                let weiAmount = utils.parseEther((amount).toString());
                setInputAmount(weiAmount.toString());

            }
            

        } ;

 
        function deposit() {
            
            console.log(inputAmount, "deposit input amount")
            console.log(isLoading, "isLoading")
            if (inputAmount > 0) {
                setNonZero(false);
                setIsLoading(true);
                console.log(isLoading, "isLoading")
                UserInteractionContract.depositBalance({value : inputAmount})
                .then((result) => {
                    console.log(result, 'deposit successful');
                    
                })
                .catch((error) => console.log(error));
                GetBalance();}
            else {
                setNonZero(true);
                setIsLoading(false);
            }
        }

        function withdrawal() {
            console.log(inputAmount, "withdrawal input amount")
            
            if (inputAmount > 0){
            setNonZero(false);
            setIsLoading(true);
            UserInteractionContract.withdrawBalance(inputAmount)
            .then((result) => {
                console.log(result, 'withdrawal successful')
                
                
            })
            .catch((error) => console.log(error, "withdrawal Error")) 
            GetBalance();
            } else {
                setNonZero(true);
            }
        }



        return (
            <>          
                <form onSubmit={handleSubmit}>
                <div className="inputAmount">
                    <div>
                    {needMoney ? 
                    <h3 style={{textAlign : 'center', color: 'red'}}>DEPOSIT ETH TO CONTINUE</h3>
                    :
                    null}
                    {nonZero ? 
                    <h3 style={{textAlign : 'center', color: 'red'}}>ENTER AN AMOUNT GREATER THAN ZERO</h3>
                    :
                    null}
                    {isLoading ? 
                    <h3 style={{textAlign : 'center', color: 'green'}}>Waiting for contract response...</h3>
                    :
                    null}
                        <label>
                            <input
                                className="inputAmount"
                                type="number"
                                step="any"
                                onChange={onChange}
                                placeholder="Enter Amount in ETH"
                            /> 
                        </label> 
                    </div>
                </div>

                <div className="txButtons">                           
                    <button className="submitButton" id="deposit" type="submit" onClick={deposit}>Submit Amount to Player Bank</button>
                    <button className="submitButton" id="withdrawal" type="submit" onClick={withdrawal}>Withdraw Amount from Player Bank</button>
                </div>
            </form>
          </>          
        )
    }

    const GetDepositBalance = () => {
        useEffect(() =>{
            if (UserInteractionContract) {        
            UserInteractionContract.getDepositBalance()
            .then((result) => setBalance(utils.formatEther(result.toString()).toString()))
            .catch( (error) => {
                console.log(error)
            });}
    
        },[])    
        
        return (
            <div className="getBalance">
                Current Player Bank: {balance}
            </div>
        )
    }
    

    return (
        <div>
        
        
            {mainAccount ?
             
            registration ?   
            <div>
                <div className="songContainer">           
                    <>                      
                        <div className="buyAlbumButtonContainer">
                            
                            <BuyAlbumButton
                                className="buttonContainer"
                                mainAccount={mainAccount}
                                balance={balance}
                                purchased={purchased}
                                setPurchased={setPurchased}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                OwnershipTokenContract={OwnershipTokenContract}
                                UserInteractionContract={UserInteractionContract}
                                GetBalance={GetBalance}
                                needMoney={needMoney}
                                setNeedMoney={setNeedMoney}
                            />
                            <div className="albumNotice">
                                <h5>Unlimited free plays after album is purchased</h5>
                            </div>
                        </div>


                        <div className="audioPlayerDiv">
                            <AudioPlayer 
                                tracks={tracks} 
                                startingTrackIndex={trackNumber}  
                                UserInteractionContract={UserInteractionContract}
                                GetBalance={GetBalance}
                                setBalance={setBalance}
                                setIsLoading={setIsLoading}
                                setCurrentTrack={setCurrentTrack}
                                setNeedMoney={setNeedMoney}
                                purchased={purchased}
                                setPurchased={setPurchased}
                                />   
                        </div>


                        <AlbumStats />
    
                    </>
                </div>
                <GetDepositBalance balance={balance} />        
                <DepositWithdrawal UserInteractionContract={UserInteractionContract} />

            </div>
                  
                 
           
            :
            <PleaseRegister />
            :
            <PleaseConnect />
            }
        </div>
    )
   

}

export default AudioMain;





 /*

 return (
        <div>
        
        
            {mainAccount ?
             
            registration ?   
            <div>
                <div className="songContainer">           
                    <>
                        
                        <div className="buyAlbumButtonContainer">
                            
                            <BuyAlbumButton
                            className="buttonContainer"
                            mainAccount={mainAccount}
                            balance={balance}
                            purchased={purchased}
                            setPurchased={setPurchased}
                            OwnershipTokenContract={OwnershipTokenContract}
                            UserInteractionContract={UserInteractionContract}
                            GetBalance={GetBalance}
                            needMoney={needMoney}
                            setNeedMoney={setNeedMoney}
                            />
                            <div className="albumNotice">
                                <h5> Unlimited free plays after album is purchased</h5>
                            </div>
                        </div>


                        <div className="audioPlayerDiv">
                            <AudioPlayer 
                                tracks={tracks} 
                                startingTrackIndex={trackNumber}  
                                UserInteractionContract={UserInteractionContract}
                                GetBalance={GetBalance}
                                setBalance={setBalance}
                                setCurrentTrack={setCurrentTrack}
                                setNeedMoney={setNeedMoney}
                                purchased={purchased}
                                />   
                        </div>


                        <AlbumStats />
    
                    </>
                </div>
                <GetDepositBalance balance={balance} />        
                <DepositWithdrawal UserInteractionContract={UserInteractionContract} />

            </div>
                  
                 
           
            :
            <PleaseRegister />
            :
            <PleaseConnect />
            }
        </div>
    )

    */