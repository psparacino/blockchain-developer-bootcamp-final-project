import AudioMain from './AudioMain.js';
import MetaMaskButton from './components/MetaMaskButton.js';
import useHandleEthereum from './hooks/useHandleEthereum.js';

import tracks from "./tracks";

import './App.css';
import { useState } from 'react';

function App() {
  const {mainAccount, setMainAccount} = useHandleEthereum();

  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton style="color: black" mainAccount={mainAccount} setMainAccount={setMainAccount}/>
        <AudioMain />
        
      </header>
    </div>
  );
}

export default App;
