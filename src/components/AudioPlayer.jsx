import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls.jsx";
import Backdrop from "./BackDrop.jsx";
import { ethers } from "ethers";
import "./styles.css";
import { useImperativeHandle } from "react/cjs/react.development";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AudioPlayer = ({
    tracks, 
    startingTrackIndex, 
    UserInteractionContract, 
    setCurrentTrack, 
    setNeedMoney, 
    purchased,
    GetBalance}) => {
  // State
  const [trackIndex, setTrackIndex] = useState(startingTrackIndex);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
      setCurrentTrack(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
      setCurrentTrack(trackIndex - 1);
    }
    setHasPaid(false);
    
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
      setCurrentTrack(trackIndex + 1);
    } else {
      setTrackIndex(0);
      setCurrentTrack(0);
    }
    setHasPaid(false);
  };





  console.log(isPlaying, hasPaid, "isPlaying and hasPaid on Load")

  async function initiatePlay() {
    const userBalance = await UserInteractionContract.getDepositBalance();
    if (userBalance > 1308805763219) {
      setNeedMoney(false)
    //const tx = await UserInteractionContract.Play(1, trackIndex);
    //UserInteractionContract.Play(1, trackIndex)
      let tx = await UserInteractionContract.Play(1, trackIndex);

      let receipt = await tx.wait();
    //console.log(receipt.events?.filter((SongPlayed) => {return SongPlayed.event == "SongPlayed"}), "LOGGED");
    //console.log(receipt, "receipt")
      if (receipt) {
        setHasPaid(true)
        GetBalance();
    }

  } else {
      setNeedMoney(true);
  }
  }


     
    

  useEffect(() => {
    if (hasPaid) {

      audioRef.current.pause();

      audioRef.current = new Audio(audioSrc);
      setTrackProgress(audioRef.current.currentTime);

  
      if (isReady.current && hasPaid) {
        audioRef.current.play();
        console.log("1")
        setIsPlaying(true);
        startTimer();
      } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
      }
    };

  }, [hasPaid])
  //change 144 to conditional to allow playing without paying
  useEffect(() => {
    if (isPlaying && hasPaid) {
      audioRef.current.play();
      
      startTimer();
    } else if (isPlaying && !hasPaid) {
      console.log("2")
      initiatePlay();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current && hasPaid) {
      audioRef.current.play();
      console.log("3")
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        <img
          className="artwork"
          src={image}
          alt={`track artwork for ${title} by ${artist}`}
        />
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>

        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        /> 
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AudioPlayer;

