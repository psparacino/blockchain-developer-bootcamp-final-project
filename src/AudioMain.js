import React, { useState } from 'react';
import AudioPlayer from  './AudioPlayer.jsx';
import AudioControls from './AudioControls.jsx';
import tracks from "./tracks";

//images
import checkmark from './assets/greencheck.png';
import red_x from './assets/Red_X.png';
//styles
import './AudioMain.css';

const AudioMain = () => {

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



    return (

    <div>
        <AudioPlayer tracks={tracks} startingTrackIndex={trackNumber} />
        
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