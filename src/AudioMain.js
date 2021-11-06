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

//import DepositWithdrawal from './AudioMainComponents/DepositWithdrawal.js';

//Contracts


const AudioMain = ({mainAccount, balance, setBalance, purchased, registration, setPurchased, UserInteractionContract, OwnershipTokenContract}) => {

    const [trackNumber, setTrackNumber] = useState(0);

    const [currentTrack, setCurrentTrack] = useState('');

    const [playCount, setPlayCount] = useState(0);

    console.log(UserInteractionContract, "Contract Object")


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

        UserInteractionContract.on("SongPlayed" , (songID, success) => {
            console.log(songID.toNumber(), success);
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))));
                    console.log(balance, "PLAY EVENT");
                }
            } 
        )
    }

    const AlbumStats = () => {
        const [stats, setStats] = useState(0);
        

        UserInteractionContract.getPlayCount(1)
            .then((result) => setStats(result.toString()))
            //need to fix above to access state variable in contract
 
        return (
            <div className='stats'>
                <div id='stat1'>
                    <p>Total Plays (all users/all songs): {stats}</p>
                </div>
                <div id='stat2'>
                    <p>{currentTrack} Plays: {stats}</p>  
                </div>        
            </div>
        
        )
    }
  



    const PlaySong = () => {
            
        async function initiatePlay() {
            UserInteractionContract.Play(1, 1)
                .then(
                    UserInteractionContract.on("SongPlayed" , (songID, success) => {
                        //console.log(songID.toNumber(), success);
                            if (success) {
                                GetBalance();
                                console.log(balance, "song successfully played and post balance");
                            }
                        })
                )
            }
            

        return (
            <div>
                {purchased ?
                <button className="tempPlayButton">
                    payment disabled because album is bought
                </button>
                :
                <button className="tempPlayButton"  onClick={initiatePlay}>
                    Temp Play
                </button>
                }
            </div>

        )
    }
  
    const DepositWithdrawal = () => {

        const [inputAmount, setInputAmount] = useState(0);

        const handleSubmit = (event) => {
            event.preventDefault();
          }

        function formatString(wei) {
            if (wei > 0) {
                let weiAmount = utils.formatEther((wei).toString());
                return weiAmount;
            }
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
                console.log(result, 'deposit successful')
                
                
            })
            .catch((error) => console.log(error)) 
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
                <div className="inputAmount" style={{paddingTop: "20px"}} >
                    <div>
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
        
        
            {registration ?   
            <div>
                <div className="songContainer">           
                    <>
                        <div className="buyAlbumButtonContainer">

                            <BuyAlbumButton
                            mainAccount={mainAccount}
                            purchased={purchased}
                            setPurchased={setPurchased}
                            OwnershipTokenContract={OwnershipTokenContract}
                            UserInteractionContract={UserInteractionContract}
                            GetBalance={GetBalance}
                            />
                            

                        </div>


                        <div className="audioPlayerDiv">
                            <AudioPlayer tracks={tracks} mainAccount={mainAccount} startingTrackIndex={trackNumber} PlaySong={PlaySong} />   
                        </div>


                        <AlbumStats />



                        
                   
                       
                    </>
                </div>
                <GetDepositBalance balance={balance} />        
                <DepositWithdrawal UserInteractionContract={UserInteractionContract} />
                <PlaySong />

            </div>
                  
                 
           
            :
            <PleaseRegister />}
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

 