import AudioMain from './AudioMain.js';
import MetaMaskButton from './components/MetaMaskButton.js';
import BuyAlbumButton from './components/BuyAlbumButton.js';

//import hooks
import useHandleEthereum from './hooks/useHandleEthereum.js';
import useRegistrationCheck from './hooks/useRegistrationCheck.js';
import ContractObjectRepo from './hooks/ContractObjectRepo.js'


import tracks from "./tracks";

import './App.css';
import { useState } from 'react';

function App() {
  const {mainAccount, setMainAccount, signer, provider} = useHandleEthereum();
  const {UserInteractionContract} = ContractObjectRepo();
  const {registration} = useRegistrationCheck();


  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton style="color: black" mainAccount={mainAccount} setMainAccount={setMainAccount}/>
        {mainAccount ?
        <BuyAlbumButton mainAccount={mainAccount} signer={signer} provider={provider} UserInteractionContract={UserInteractionContract} /> :
        null}
        <AudioMain mainAccount={mainAccount} registration={registration} UserInteractionContract={UserInteractionContract} />
        
      </header>
    </div>
  );
}

export default App;
