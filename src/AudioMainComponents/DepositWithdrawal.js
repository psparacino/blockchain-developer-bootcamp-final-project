import React, { useEffect, useState } from 'react';
import { utils, ethers } from 'ethers';

import useUpdates from '../hooks/useUpdates.js';


const DepositWithdrawal = ({UserInteractionContract}) => {

        const [inputAmount, setInputAmount] = useState(0);

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
                setInputAmount(0);

            } else {
                let weiAmount = utils.parseEther((amount).toString());
                //console.log(weiAmount.toString())
                setInputAmount(weiAmount.toString());
                //console.log(inputAmount);
            }
            

        } ;

 
        function Deposit() {
            console.log(inputAmount, "deposit input amount")
            UserInteractionContract.depositBalance({value : inputAmount})
            .then((result) => {
                console.log(result, 'deposit successful')
                
                
            })
            .catch((error) => console.log(error)) 
            useUpdates();
        }

        function Withdrawal() {
            console.log(inputAmount, "withdrawal input amount")
            UserInteractionContract.withdrawBalance({value:inputAmount})
            .then((result) => {
                console.log(result, 'withdrawal successful')
                
                
            })
            .catch((error) => console.log(error, "withdrawal Error")) 
            useUpdates();
        }



        return (
            <>
                <div> Input value: {formatString(inputAmount)}</div>
                <form onSubmit={handleSubmit}>
                <label>Enter deposit amount in ETH: {utils.etherSymbol}
                <input
                    type="number"
                    step="any"
                    onChange={onChange}
                />
                </label>
                <button className="submitButton" type="submit" onClick={Deposit}>Submit Amount to Player Bank</button>
                <button className="submitButton" type="submit" onClick={Withdrawal}>Wtihdraw Amount from Player Bank</button>
            </form>
          </>
            
        )

    }

    export default DepositWithdrawal;