import React, { useState } from 'react';
import { ethers } from 'ethers';
import AudioPlayer from  './components/AudioPlayer.jsx';
import tracks from "./tracks";

//images
import checkmark from './assets/greencheck.png';
import red_x from './assets/Red_X.png';
//styles
import './AudioMain.css';
import { useEffect } from 'react/cjs/react.development';

//Contracts


const AudioMain = ({mainAccount, UserInteractionContract}) => {

    const [trackNumber, setTrackNumber] = useState(0);

    const [currentTrack, setCurrentTrack] = useState('');

    const [playCount, setPlayCount] = useState(0);
 


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

    const AlbumStats = () => {

        return (
            <div style={{textAlign : 'center', marginTop : '40px'}}>
                <p>{currentTrack} PLAYS (ALL USERS): 0</p>
                <p>{currentTrack} Album Purchases: (ALL USERS): 0</p>
            </div>
        
        //needs to track plays of songs. that state will maybe live on ipfs.
        
        )
    }

    const RegisterButton = () => {
        const [registered, setRegistered] = useState(false)
        //put useEffectHere


        function register() {
            try {UserInteractionContract.RegisterAddress()
            .then((result) => console.log(result))}
            //need to fix above to access state variable in contract
            catch (error) {
                console.log(error)
            }
        }

        async function verify() {
            await UserInteractionContract.verifyRegistration().
            then((result) => setRegistered(result));
        }


    return (
        <div>
            <button className="buyAlbumButton" id="buyButton" onClick={register, verify}>
            {registered == true ? "Registered!" : "Click here for one-time registration"}
            {console.log(registered, "registered")}       
            </button>
        </div>
    )
}
    



    return (

    <div>
        <AudioPlayer tracks={tracks} startingTrackIndex={trackNumber} />
        <RegisterButton />
        <AlbumStats />
        <div className="BuyDiv">
            <AlbumOwnership />
        </div>

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