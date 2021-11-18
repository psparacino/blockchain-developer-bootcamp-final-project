import AudioMain from './AudioMain.js';
import MetaMaskButton from './components/MetaMaskButton.js';
import RegisterButton from './components/RegisterButton.js'; 

//import hooks
import useHandleEthereum from './hooks/useHandleEthereum.js';
import useRegistrationCheck from './hooks/useRegistrationCheck.js';
import useContractObjectRepo from './hooks/useContractObjectRepo.js';
import useGetBalance from './hooks/useGetBalance.js';
import useAlbumPurchaseConfirm from './hooks/useAlbumPurchaseConfirm.js';

import './App.css';



function App() {
  const {mainAccount, setMainAccount} = useHandleEthereum();
  const {UserInteractionContract, OwnershipTokenContract} = useContractObjectRepo();
  const {registration, setRegistration} = useRegistrationCheck();
  const {balance, setBalance} = useGetBalance();
  const {purchased, setPurchased} = useAlbumPurchaseConfirm();


  return (
    <div className="App">
      <header className="App-header">    
      </header>
      <div className="MetaMaskConnect">
        <MetaMaskButton style="color: black" mainAccount={mainAccount} setMainAccount={setMainAccount}/>
        <a style={{float: 'right', paddingTop: '5px' , fontSize : '15px'}} href={"https://faucets.chain.link/"}  target={"_blank"}>FILL UP ON KOVAN ETH IF YOU NEED 'EM</a>
      </div>
      
        {mainAccount ?
        <RegisterButton registration={registration} setRegistration={setRegistration} UserInteractionContract={UserInteractionContract} />
        :
        null}
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
    </div>
  );
}

export default App;
