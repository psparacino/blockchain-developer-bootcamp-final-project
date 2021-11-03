import imgSrc from "./assets/AnoumanCover.jpg";
import imgSrc2 from "./assets/OrkestraCover.jpg";
import shenanigans from "./assets/Shenanigans.mp3";
import interdweller from "./assets/InterDweller.mp3";
import lastoria from "./assets/LaStoria.mp3";

// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/
export default [
  {
    title: "Shenanigans",
    artist: "Anouman",
    audioSrc: shenanigans,
    image: imgSrc,
    color: "#00aeb0"
  },
  {
    title: "InterDweller",
    artist: "Orkestra Eustoria",
    audioSrc: interdweller,
    image: imgSrc2,
    color: "#ffb77a"
  },
  {
    title: "La Storia",
    artist: "Anouman",
    audioSrc: lastoria,
    image: imgSrc,
    color: "#5f9fff"
  }
];
