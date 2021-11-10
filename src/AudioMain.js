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


const AudioMain = ({mainAccount, balance, setBalance, purchased, registration, setPurchased, UserInteractionContract, OwnershipTokenContract}) => {

    const [trackNumber, setTrackNumber] = useState(0);

    const [currentTrack, setCurrentTrack] = useState(0);

    const [needMoney, setNeedMoney] = useState(false);

    
    console.log(process.env.REACT_APP_INFURA_URL, "INFURA")
    console.log(UserInteractionContract, "Contract Object");

    mainAccount ? console.log(UserInteractionContract.getEthPriceToday(), "Eth Price Today") : console.log("not connected");


    async function GetBalance() {
        UserInteractionContract.on("AmountDeposited" , (address, uint, success) => {
            console.log(address, uint, success);
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))));
                    console.log(balance, "DEPOSIT EVENT");
                }
            } 
        )

        UserInteractionContract.on("WithdrawalComplete" , (address, uint, balance, success) => {
            console.log(address, uint, success);
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))));
                    console.log(balance, "WITHDRAWAL EVENT");
                }
            } 
        )
        //check if this is cuasing double event

        UserInteractionContract.on("SongPlayed" , (songID, success) => {
            console.log(songID.toNumber(), success);
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))))
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
                <div id='stat1'>
                    <p>Total Plays (all users/all songs): {totalStats}</p>
                </div>
                <div id='stat1'>
                    <p>{songTitle(currentTrack)} Total Play Count: {stats}</p>  
                </div>
                <div id='stat1'>
                    <p>{songTitle(currentTrack)} User Play Count: {userStats}</p>  
                </div>        
            </div>
        
        )
    }

  
    const DepositWithdrawal = () => {

        const [inputAmount, setInputAmount] = useState(0);

        const handleSubmit = (event) => {
            event.preventDefault();
          } 

        const onChange = (event) => {
            const amount = event.target.value;
            if (amount == 0 || null) {
                setInputAmount(0);

            } else {
                let weiAmount = utils.parseEther((amount).toString());
                //console.log(weiAmount.toString())
                setInputAmount(weiAmount.toString());
                //console.log(inputAmount);
            }
            

        } ;

 
        function deposit() {
            console.log(inputAmount, "deposit input amount")
            UserInteractionContract.depositBalance({value : inputAmount})
            .then((result) => {
                console.log(result, 'deposit successful');
                
            })
            .catch((error) => console.log(error));
            GetBalance();
        }

        function withdrawal() {
            console.log(inputAmount, "withdrawal input amount")
            UserInteractionContract.withdrawBalance(inputAmount)
            .then((result) => {
                console.log(result, 'withdrawal successful')
                
                
            })
            .catch((error) => console.log(error, "withdrawal Error")) 
            GetBalance();
        }



        return (
            <>          
                <form onSubmit={handleSubmit}>
                <div className="inputAmount">
                    <div>
                    {needMoney ? 
                    <h3 style={{textAlign : 'center'}}> DEPOSIT ETH TO CONTINUE </h3>
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
                            

                        </div>


                        <div className="audioPlayerDiv">
                            <AudioPlayer 
                                tracks={tracks} 
                                startingTrackIndex={trackNumber}  
                                UserInteractionContract={UserInteractionContract}
                                GetBalance={GetBalance}
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
                {/*<PlaySong />*/}

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



{/*
        <table className="mainTable">
         
            <thead>
                <tr>
                    <th>
                        Play Song
                    </th>
                    <th>
                        Title
                    </th>
                    <th>
                        Artist
                    </th>
                    <th>
                        Your Play Count
                    </th>
                    <th>
                        Album Art
                    </th>
                </tr>
            </thead>  
            
       
        {tracks.map((track, index) =>            
                   
            <tr>
                <td>
                    <button className="playButton" 
                    onClick={
                        () => {
                            setTrackNumber(index);
                            setCurrentTrack(track.title);
                            
                         
                        }         
                    }>
                    {'▶️'}
                    </button>
                </td>
                <td>
                    {track.title}
                </td>
                <td>
                    {track.artist}
                </td>
                <td>
                {playCount}
                </td>
                <td>
                   <img className="albumArt" src={track.image} />
                </td>
            </tr>
        )}
       </table>

 */}

 