import AudioPlayer from './AudioPlayer.jsx';
import Button from './Button.js';

import tracks from "./tracks";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button style="color: black" />
        <AudioPlayer tracks={tracks} />
      </header>
    </div>
  );
}

export default App;
