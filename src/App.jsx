// src/App.js
import React from 'react';
import { useAccount, useBalance, useWalletClient,useEnsName } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from './components/Container';
import TransferTokens from './components/TransferTokens';
import { ethers } from 'ethers';
import {shortenAddress} from "../src/utils/tokenConfig"
import useTokenBalance from '../src/hooks/useTokenBalance';
export default function App() {
  const { address, isConnected } = useAccount();
  //const { data: balance } = useBalance({ address });
  const { data: signer } = useWalletClient();
  const { data: ensName } = useEnsName({ address });
  const { balance, isLoading ,tokensymbol} = useTokenBalance();
  // Utility to shorten wallet address

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <Header />

      <Container>
        {isConnected ? (
          <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={`https://avatars.dicebear.com/api/identicon/${address}.svg`}
              alt="Avatar"
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="text-xl font-medium">
              {ensName ? ensName : shortenAddress(address)}
            </p>
            {isLoading ? (
                <p className="text-lg">Loading token balance...</p>
              ) : (
                <p className="mb-4 text-xl font-medium">
                  {`Token Balance: ${balance ? balance : '0'} ${tokensymbol}`}
                </p>
              )}

          </div>
            <TransferTokens signer={signer} />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <p className="text-xl">Please connect your wallet to continue.</p>
          </div>
        )}
      </Container>

      <Footer />
      <ToastContainer />
    </div>
  );
}
