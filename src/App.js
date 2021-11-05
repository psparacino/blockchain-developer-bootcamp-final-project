import AudioMain from './AudioMain.js';
import MetaMaskButton from './components/MetaMaskButton.js';
import BuyAlbumButton from './components/BuyAlbumButton.js';
import RegisterButton from './components/RegisterButton.js'; 

//import hooks
import useHandleEthereum from './hooks/useHandleEthereum.js';
import useRegistrationCheck from './hooks/useRegistrationCheck.js';
import useContractObjectRepo from './hooks/useContractObjectRepo.js';
import useUpdates from './hooks/useContractObjectRepo.js'; 

import tracks from "./tracks";

import './App.css';
import { useState } from 'react';
import useGetBalance from './hooks/useGetBalance.js';
import useAlbumPurchaseConfirm from './hooks/useAlbumPurchaseConfirm.js';

function App() {
  const {mainAccount, setMainAccount, signer, provider} = useHandleEthereum();
  const {UserInteractionContract, OwnershipTokenContract} = useContractObjectRepo();
  const {registration, setRegistration} = useRegistrationCheck();
  const {balance, setBalance} = useGetBalance();
  const {purchased, setPurchased} = useAlbumPurchaseConfirm();


  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton style="color: black" mainAccount={mainAccount} setMainAccount={setMainAccount}/>
        <RegisterButton registration={registration} setRegistration={setRegistration} UserInteractionContract={UserInteractionContract} />
        <AudioMain 
          mainAccount={mainAccount} 
          balance={balance} 
          setBalance={setBalance} 
          registration={registration} 
          setRegistration={setRegistration} 
          purchased={purchased} 
          setPurchased={setPurchased}
          UserInteractionContract={UserInteractionContract}
          OwnershipTokenContract={OwnershipTokenContract}


        />
        <useUpdates balance={balance} setBalance={setBalance} UserInteractionContract={UserInteractionContract} />
        
      </header>
    </div>
  );
}

export default App;
