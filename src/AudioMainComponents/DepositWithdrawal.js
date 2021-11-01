import React, { useEffect, useState } from 'react';
import { utils, ethers } from 'ethers';
import UserInteractionContract from '../hooks/useContractObjectRepo.js';


const DepositWithdrawal = ({UserInteractionContract, balance, setBalance}) => {

    const [depositAmount, setDepositAmount] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
      }

    function formatString(wei) {
        if (wei > 0) {
            let weiAmount = utils.formatEther((wei).toString());
            return weiAmount;
        }
    }  

    const onChange = (event) => {
        const amount = event.target.value;
        if (amount == 0 || null) {
            setDepositAmount(0);

        } else {
            let weiAmount = utils.parseEther((amount).toString());
            //console.log(weiAmount.toString())
            setDepositAmount(weiAmount.toString());
            //console.log(depositAmount);
        }
        

    } ;


    function deposit() {
        UserInteractionContract.depositBalance({value : depositAmount})
        .then((result) => {
            console.log(result, 'deposit successful')
            
            
        })
        .catch((error) => console.log(error)) 
        GetBalance();
    }
        /*
        const updatedBalance = await UserInteractionContract.getDepositBalance();
        const setBalanceNum = utils.formatEther(updatedBalance.toString()).toString();
        setBalance(setBalanceNum)
        console.log(setBalanceNum, 'SET BALANCE NUM')
        console.log(response, "deposit response")
        */
        
    

    async function GetBalance() {
        UserInteractionContract.on("AmountDeposited" , (address, uint, success) => {
            console.log(address, uint, success);
                if (success) {
                    UserInteractionContract.getDepositBalance()
                    .then((result) => (setBalance(utils.formatEther(result.toString()))));
                    console.log(balance, "DEPOSIT EVENT");
                }
            }
        )
    }


    return (
        <>
            <div> Input value: {formatString(depositAmount)}</div>
            <form onSubmit={handleSubmit}>
            <label>Enter deposit amount in ETH: {utils.etherSymbol}
            <input
                type="number"
                step="any"
                onChange={onChange}
            />
            </label>
            <button className="submitButton" type="submit" onClick={deposit}>Submit Amount to Player Bank</button>
            <p>Current Balance: {balance ? balance : "No current balance"}</p>
        </form>
      </>
        
    )

}

//how to update without a page refresh?
const GetDepositBalance = ({balance}) => {
    
    return (
        <p>Current Balance: {balance}</p>
    )
}

export default DepositWithdrawal;