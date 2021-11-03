import { utils, ethers } from 'ethers';

async function useUpdates({balance, setBalance, UserInteractionContract}) {
    UserInteractionContract.on("AmountDeposited" , (address, uint, success) => {
        console.log(address, uint, success);
            if (success) {
                UserInteractionContract.getDepositBalance()
                .then((result) => (setBalance(utils.formatEther(result.toString()))));
                console.log(balance, "DEPOSIT EVENT");
            }
        } 
    )

    UserInteractionContract.on("WithdrawalComplete" , (address, uint, balance, success) => {
        console.log(address, uint, success);
            if (success) {
                UserInteractionContract.getDepositBalance()
                .then((result) => (setBalance(utils.formatEther(result.toString()))));
                console.log(balance, "WITHDRAWAL EVENT");
            }
        } 
    )

    UserInteractionContract.on("SongPlayed" , (songID, success) => {
        console.log(songID, success);
            if (success) {
                UserInteractionContract.getDepositBalance()
                .then((result) => (setBalance(utils.formatEther(result.toString()))));
                console.log(balance, "PLAY EVENT");
            }
        } 
    )
}

export default useUpdates;