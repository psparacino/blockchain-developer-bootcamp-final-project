import React from 'react';
import AudioPlayer from  './AudioPlayer.jsx';
import tracks from "./tracks";

//styles
import './AudioMain.css';

const AudioPage = () => {

    return (

    <div>
        <AudioPlayer tracks={tracks} />
        {tracks.map(track => 
       <table>
            <tbody>
                <tr>
                    <th>
                        title
                    </th>
                </tr>
            <tr>
                <td>
                    {track.title}
                </td>
                <td>
                    {track.artist}
                </td>
            </tr>
            </tbody>
       </table>

       )}

    </div>


    )

}

export default AudioPage;