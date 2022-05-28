import { IonContent, IonPage,} from '@ionic/react';
import './Home.scss';
import { TezosToolkit } from '@taquito/taquito';
import React, { useEffect,useState } from 'react';
import {BeaconWallet} from '@taquito/beacon-wallet'
import { DAppClient, NetworkType, } from "@airgap/beacon-sdk"
import { Buffer } from "buffer";
const Home: React.FC = () => {
  const rpcUrl = "https://hangzhounet.smartpy.io"
  let contractAddress = "KT1VhyADNN89mNr5WVzzFszNYAUU6qWpQMxp"
  let tezos:TezosToolkit;
  let userAddress = "";
  const [wallet,setWallet] = useState({"address":"","balance":""})
  let beaconWallet: BeaconWallet;
  let activeAccount: any;
  
  useEffect(()=>{
    const mount = async ()=>{
      tezos = new TezosToolkit(rpcUrl);
      beaconWallet = new BeaconWallet({
        name: "Taquito Workshop",
        preferredNetwork:NetworkType.FLORENCENET
      });
      
      
    }
    mount()
  
    
  })
  
  const connect = async () => {
    await beaconWallet.requestPermissions({network:{type: NetworkType.HANGZHOUNET,rpcUrl}})

    tezos.setWalletProvider(beaconWallet);
    userAddress = await beaconWallet.getPKH();
    if(!userAddress){
      userAddress="afdsfhjkahjfjkasdhf"
    }
    setWallet({address:userAddress,balance:""})
    getBalance()
  }
  const getBalance = (()=>{
    let balance; 
    tezos.tz
    .getBalance(userAddress)
    .then((balance) =>  setWallet({address:userAddress,"balance":`${balance.toNumber() / 1000000} ꜩ`}))
    .catch((error) => setWallet({address:userAddress,balance:'12 ꜩ'}));
  })
  return (
    <IonPage>
      <IonContent>
      <div className='app'>
        <div className='app__wallet'>
        <div className='app__wallet__label'>
          {wallet.address?`address: ${wallet.address}`:""}
        </div>
        <div className='app__wallet__label'>
          {wallet.balance?`balance: ${wallet.balance}`:""}
        </div>
        </div>
        <button className='app__button' onClick={connect}>Consultar</button>
      </div>
      </IonContent>
    </IonPage>
  );
  
};

export default Home;


