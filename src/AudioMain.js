import React, { useEffect, useState } from 'react';
import { utils, ethers } from 'ethers';
import AudioPlayer from  './components/AudioPlayer.jsx';
import tracks from "./tracks";


//styles
import './AudioMain.css';


//components

//import DepositWithdrawal from './AudioMainComponents/DepositWithdrawal.js';

//Contracts


const AudioMain = ({mainAccount, balance, setBalance, purchased, registration, setRegistration, UserInteractionContract}) => {

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
        
        
            useEffect(() => {
                try {UserInteractionContract.getPlayCount(1)
                    .then((result) => setStats(result.toString()))}
                    //need to fix above to access state variable in contract
                    catch (error) {
                        console.log(error, "DESPOSIT RESULT ERROR")
                    }
            
        }, [DepositWithdrawal]);
        
    
        
        return (
            <div style={{textAlign : 'center', marginTop : '40px'}}>
                <p>{currentTrack} PLAYS (ALL USERS): {stats}</p>
                <p>{currentTrack} Album Purchases: (ALL USERS): 0</p>
            </div>
        
        )
    }
     

    const RegisterButton = ({registration, setRegistration}) => {

        function register() {
            UserInteractionContract.RegisterAddress()
            .then((result) => {
                console.log(result, 'registration successful')
                
            })
            .catch((error) => console.log(error)) 
            Verify();       
        }

        async function Verify() {
            UserInteractionContract.on("UserRegistered" , (address, success) => {
                console.log(address, success);
                    if (success) {
                        setRegistration(true);
                    }
                }
            )
        }


    return (
        <div>
            {registration ?
            <button className="buyAlbumButton" id="buyButton">
            Registered!   
            </button>
            : <button className="buyAlbumButton" id="buyButton" onClick={register}>
            Click here for one-time registration  
            </button>}
            
        </div>
    )
}


    const PlaySong = () => {

        async function playSong() {
            await UserInteractionContract.Play(1, 1)
            .then(GetBalance())
            console.log("song successfully played")
            }
  

        return (
            <div>
                {purchased ?
                <button className="tempPlayButton">
                    payment disabled because album is bought
                </button>
                :
                <button className="tempPlayButton"  onClick={playSong}>
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
            UserInteractionContract.withdrawBalance({value:inputAmount})
            .then((result) => {
                console.log(result, 'withdrawal successful')
                
                
            })
            .catch((error) => console.log(error, "withdrawal Error")) 
            GetBalance();
        }



        return (
            <>
                <div> Input value: {formatString(inputAmount)}</div>
                <form onSubmit={handleSubmit}>
                <label>Enter deposit amount in ETH: {utils.etherSymbol}
                <input
                    type="number"
                    step="any"
                    onChange={onChange}
                />
                </label>
                <button className="submitButton" type="submit" onClick={deposit}>Submit Amount to Player Bank</button>
                <button className="submitButton" type="submit" onClick={withdrawal}>Withdraw Amount from Player Bank</button>
            </form>
          </>
            
        )

    }


    //how to update without a page refresh?
    const GetDepositBalance = () => {
        
        return (
            <p>Current Balance: {balance}</p>
        )
    }
    

    return (

    <div>
        <RegisterButton registration={registration} setRegistration={setRegistration}/>
        <AudioPlayer tracks={tracks} mainAccount={mainAccount} startingTrackIndex={trackNumber} PlaySong={PlaySong} />    
        <PlaySong />
        <AlbumStats />
        <DepositWithdrawal UserInteractionContract={UserInteractionContract} />
        <GetDepositBalance balance={balance} />

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
    </div>



    )
   

}

export default AudioMain;