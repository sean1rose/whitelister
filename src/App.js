import React, { useEffect, useState } from 'react';
import { sequence } from '0xsequence';
import { ETHAuth } from '@0xsequence/ethauth'
import logo from './logo.svg';
import './App.css';

const App = () => {
  const wallet = new sequence.Wallet()
  const [walletAddress, setWalletAddress] = useState(null)
  wallet.on('message', message => {
    console.log('wallet event (message):', message)
  })

  wallet.on('accountsChanged', p => {
    console.log('wallet event (accountsChanged):', p)
  })

  wallet.on('chainChanged', p => {
    console.log('wallet event (chainChanged):', p)
  })

  wallet.on('connect', p => {
    console.log('wallet event (connect):', p)
  })

  wallet.on('disconnect', p => {
    console.log('wallet event (disconnect):', p)
  })

  wallet.on('open', p => {
    console.log('wallet event (open):', p)
  })

  wallet.on('close', p => {
    console.log('wallet event (close):', p)
  })

  
  // const connect = async (authorize = true) => {
  //   const connectDetails = await wallet.connect({
  //     app: 'Whitelister',
  //     authorize
  //   })
  //   console.warn('connectDetails: ', {connectDetails})
  //   console.log('user accepted connect? ', connectDetails.connected)
  //   const address = await wallet.getAddress()
  //   console.log('wallet address: ', address)
  //   setWalletAddress(address)
  // }

  const connectWallet = async () => {
    if (wallet) {
      const connectDetails = await wallet.connect({
        app: 'WhiteLister',
        authorize: true
      })
      console.log('user accepted connect? ', connectDetails.connected)
      const address = await wallet.getAddress()
      console.log('wallet address found: ', address)
      setWalletAddress(address)
    }
  }
  const checkIfWalletIsConnected = async () => {
    try {
      connectWallet()
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])
  
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet}>Connect Sequence Wallet</button>
  )

  const renderWalletConnectedMessage = () => (
    <>
      <p>SEQUENCE WALLET CONNECTED!</p>
      <div>
        <p>Wallet Address:</p>
        <p>{walletAddress}</p>
      </div>
    </>
  )

  return (
    <div className="App">
      <header className="App-header">
        {!walletAddress && renderNotConnectedContainer()}
        {walletAddress && renderWalletConnectedMessage()}
        {/* <button onClick={() => connect()}>Connect</button> */}
      </header>
    </div>
  )
}

export default App;
