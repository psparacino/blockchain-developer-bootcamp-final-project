import AudioMain from './AudioMain.js';
import MetaMaskButton from './components/MetaMaskButton.js';
import BuyAlbumButton from './components/BuyAlbumButton.js';
import useHandleEthereum from './hooks/useHandleEthereum.js';

import tracks from "./tracks";

import './App.css';
import { useState } from 'react';

function App() {
  const {mainAccount, setMainAccount} = useHandleEthereum();

  const {signer, provider} = useHandleEthereum();

  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton style="color: black" mainAccount={mainAccount} setMainAccount={setMainAccount}/>
        <BuyAlbumButton mainAccount={mainAccount} signer={signer} provider={provider} />
        <AudioMain />
        
      </header>
    </div>
  );
}

export default App;
