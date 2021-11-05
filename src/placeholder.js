<div className="songContainer">           
<>
<div className="buyAlbumButtonContainer">

    <BuyAlbumButton
    mainAccount={mainAccount}
    purchased={purchased}
    setPurchased={setPurchased}
    OwnershipTokenContract={OwnershipTokenContract}
    UserInteractionContract={UserInteractionContract}
    GetBalance={GetBalance}
    />
    

</div>


<div className="audioPlayerDiv">
    <AudioPlayer tracks={tracks} mainAccount={mainAccount} startingTrackIndex={trackNumber} PlaySong={PlaySong} />   
</div>


{/*<AlbumStats />*/}




<GetDepositBalance balance={balance} />        
<DepositWithdrawal UserInteractionContract={UserInteractionContract} />
<PlaySong />
</>
</div>