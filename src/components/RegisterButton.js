import { useState, React } from 'react';
import { ethers } from 'ethers';

const RegisterButton = ({registration, setRegistration, UserInteractionContract}) => {

    function register() {
        UserInteractionContract.RegisterAddress()
        .then((result) => {
            console.log(result, 'registration successful')
            
        })
        .catch((error) => console.log(error)) 
        Verify();       
    }

    async function Verify() {
        UserInteractionContract.on("UserRegistered" , (address, success) => {
            console.log(address, success);
                if (success) {
                    setRegistration(true);
                }
            }
        )
    }


return (
    <div>
        {registration ?
        <button className="standardButton" id="registerButton">
        Registered!   
        </button>
        : <button className="standardButton" id="registerButton" onClick={register}>
        Click here for one-time registration  
        </button>}
        
    </div>
)
}

export default RegisterButton;