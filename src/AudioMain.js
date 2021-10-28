import React, { useEffect, useState } from 'react';
import { utils, ethers } from 'ethers';
import AudioPlayer from  './components/AudioPlayer.jsx';
import tracks from "./tracks";

//images
import checkmark from './assets/greencheck.png';
import red_x from './assets/Red_X.png';
//styles
import './AudioMain.css';

//Contracts


const AudioMain = ({mainAccount, balance, setBalance, registration, setRegistration, UserInteractionContract}) => {

    const [trackNumber, setTrackNumber] = useState(0);

    const [currentTrack, setCurrentTrack] = useState('');

    const [playCount, setPlayCount] = useState(0);

    //const [registered, setRegistered] = useState(false);


   
/*
    const AlbumOwnership = () => {
        const [owned, setOwned] = useState(false);

        return (
            <div style={{margin: 'auto'}}>
                <img className="ownedCheckLeft" src={owned ? checkmark : red_x} />
                <button className="buyButton" id="buy_button" onClick={() => setOwned(!owned)}>
                    {owned ? "ALBUM OWNED!"  : "--> BUY ALBUM <--"}
                </button>
                <img className="ownedCheckRight" src={owned ? checkmark : red_x} />
            </div>
        )
    }
    */

    const AlbumStats = () => {
        const [stats, setStats] = useState(0);
        
        
            useEffect(() => {
                try {UserInteractionContract.getPlayCount(1)
                    .then((result) => setStats(result.toString()))}
                    //need to fix above to access state variable in contract
                    catch (error) {
                        console.log(error, "DESPOSIT RESULT ERROR")
                    }
            
        }, [DepositBalance]);
        
    
        
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

    //FIX THIS DOES NOT WORK. TEMPORARY ONLY
    const PlaySong = () => {

        async function playSong() {
            await UserInteractionContract.Play(1, 1);
            }
  

        return (
            <button className="tempPlayButton" id="tempPlayButton" onClick={playSong}>
                Temp Play
            </button>
        )
    }
    console.log(UserInteractionContract, "Object")

    const DepositBalance = ({setBalance}) => {

        const [depositAmount, setDepositAmount] = useState(0);

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
                setDepositAmount(0);

            } else {
                let weiAmount = utils.parseEther((amount).toString());
                //console.log(weiAmount.toString())
                setDepositAmount(weiAmount.toString());
                //console.log(depositAmount);
            }
            

        } ;

 
        function deposit() {
            UserInteractionContract.depositBalance({value : depositAmount})
            .then((result) => {
                console.log(result, 'deposit successful')
                
                
            })
            .catch((error) => console.log(error)) 
            GetBalance();
        }
            /*
            const updatedBalance = await UserInteractionContract.getDepositBalance();
            const setBalanceNum = utils.formatEther(updatedBalance.toString()).toString();
            setBalance(setBalanceNum)
            console.log(setBalanceNum, 'SET BALANCE NUM')
            console.log(response, "deposit response")
            */
            
        

        async function GetBalance() {
            UserInteractionContract.on("AmountDeposited" , (address, uint, success) => {
                console.log(address, uint, success);
                    if (success) {
                        UserInteractionContract.getDepositBalance()
                        .then((result) => (console.log(result.toString())));
                        console.log(balance, "DEPOSIT EVENT");
                    }
                }
            )
        }


        return (
            <>
                <div> Input value: {formatString(depositAmount)}</div>
                <form onSubmit={handleSubmit}>
                <label>Enter deposit amount in ETH: {utils.etherSymbol}
                <input
                    type="number"
                    step="any"
                    onChange={onChange}
                />
                </label>
                <button className="submitButton" type="submit" onClick={deposit}>Submit Amount to Player Bank</button>
                <p>Current Balance: {balance ? balance : "No current balance"}</p>
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
        <AudioPlayer tracks={tracks} mainAccount={mainAccount} startingTrackIndex={trackNumber} />    
        <PlaySong />
        <AlbumStats />
        <DepositBalance setBalance={setBalance} />
        <GetDepositBalance balance={balance} />


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


    </div>


    )

}

export default AudioMain;