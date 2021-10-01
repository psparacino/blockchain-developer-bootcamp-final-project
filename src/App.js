import AudioMain from './AudioMain.js';
import Button from './Button.js';

import tracks from "./tracks";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button style="color: black" />
        <AudioMain />
        
      </header>
    </div>
  );
}

export default App;
