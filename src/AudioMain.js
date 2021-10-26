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


const AudioMain = ({mainAccount, registration, UserInteractionContract}) => {

    const [trackNumber, setTrackNumber] = useState(0);

    const [currentTrack, setCurrentTrack] = useState('');

    const [playCount, setPlayCount] = useState(0);

    const [registered, setRegistered] = useState(false);


   
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
        //useEffect Hook
        async function getPlays() {
            let plays = await UserInteractionContract.getPlayCount(1);
            console.log(plays, 'plays check');
            return plays;
        }

        //need to use Contract.on to read events/logs and changes in state


        return (
            <div style={{textAlign : 'center', marginTop : '40px'}}>
                <p>{currentTrack} PLAYS (ALL USERS): {getPlays} TEST</p>
                <p>{currentTrack} Album Purchases: (ALL USERS): 0</p>
            </div>
        
        //needs to track plays of songs. that state will maybe live on ipfs.
        
        )
    }

    const RegisterButton = () => {

        function register() {
            try {UserInteractionContract.RegisterAddress()
            .then((result) => console.log(result, 'registration successful'))}
            //need to fix above to access state variable in contract
            catch (error) {
                console.log(error)
            }
            verify();
        }

        async function verify() {
            await UserInteractionContract.verifyRegistration().
            then((result) => setRegistered(result));
        }


    return (
        <div>
            {registered == true ?
            <button className="buyAlbumButton" id="buyButton">
            {"Registered!"}   
            </button>
            : <button className="buyAlbumButton" id="buyButton" onClick={register}>
            {"Click here for one-time registration"}   
            </button>}
            
        </div>
    )
}

    //FIX THIS DOES NOT WORK. TEMPORARY ONLY
    const PlaySong = () => {

        function playSong() {
            try{UserInteractionContract.Play(1, 1).
                then((result) => console.log(result))
            }
            catch(err) {
                console.log(err)}
            }

            
        
 

        return (
            <button className="tempPlayButton" id="tempPlayButton" onClick={playSong}>
                Temp Play
            </button>
        )
    }
    console.log(UserInteractionContract, "Object")

    const DepositBalance = () => {

        const [depositAmount, setDepositAmount] = useState(0);

        const handleSubmit = (event) => {
            event.preventDefault();
          }

        const onChange = (event) => {
            const amount = event.target.value;
            if (amount > 0) {
                let weiAmount = utils.parseEther((amount).toString());
                setDepositAmount(weiAmount.toString());
                console.log(depositAmount);
            }
            

        } ;
        async function deposit() {
            const response = await UserInteractionContract.depositBalance({value : depositAmount});
            console.log(response, "play response")
        }


        return (
            <>
                <div> Input value: {depositAmount}</div>
                <form onSubmit={handleSubmit}>
                <label>Enter deposit amount in ETH: {utils.etherSymbol}
                <input
                    type="number"
                    value={depositAmount}
                    onChange={onChange}
                />
                </label>
                <button className="submitButton" type="submit" onClick={deposit}>Submit Amount to Player Bank</button>
            </form>
          </>
            
        )

    }

    //how to update without a page refresh?
    const GetDepositBalance = () => {
        const [balance, setBalance] = useState(0);
        
        
            useEffect(() => {
                try {UserInteractionContract.getDepositBalance()
                    .then((result) => setBalance(utils.formatEther(result.toString()).toString()))}
                    //need to fix above to access state variable in contract
                    catch (error) {
                        console.log(error, "DESPOSIT RESULT ERROR")
                    }
            
        }, [DepositBalance]);
        
    
        
        return (
            <p>Current Balance: {balance}</p>
        )
    }
    



    return (

    <div>
        <AudioPlayer tracks={tracks} mainAccount={mainAccount} startingTrackIndex={trackNumber} />
        <RegisterButton />
        <PlaySong />
        <AlbumStats />
        <DepositBalance />
        <GetDepositBalance />


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