import AudioMain from './AudioMain.js';
import MetaMaskButton from './components/MetaMaskButton.js';
import BuyAlbumButton from './components/BuyAlbumButton.js';
import useHandleEthereum from './hooks/useHandleEthereum.js';
import ContractObjectRepo from './hooks/ContractObjectRepo.js';

import tracks from "./tracks";

import './App.css';
import { useState } from 'react';

function App() {
  const {mainAccount, setMainAccount, signer, provider} = useHandleEthereum();
  const {UserInteractionContract} = ContractObjectRepo();


  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton style="color: black" mainAccount={mainAccount} setMainAccount={setMainAccount}/>
        {mainAccount ?
        <BuyAlbumButton mainAccount={mainAccount} signer={signer} provider={provider} /> :
        null}
        <AudioMain mainAccount={mainAccount} UserInteractionContract={UserInteractionContract} />
        
      </header>
    </div>
  );
}

export default App;
