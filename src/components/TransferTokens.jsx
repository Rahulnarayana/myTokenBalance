
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useTokenBalance from '../hooks/useTokenBalance';
import useTokenTransfer from '../hooks/useTokenTransfer';
import useEIP712Sign from '../hooks/useEIP712Sign';

export default function TransferTokens({ signer }) {
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const { isSigned, handleSignAgreement } = useEIP712Sign();
  const { balance } = useTokenBalance();
  const { transferTokens, isLoading} = useTokenTransfer();

  const handleTransfer = async () => {
    try{
        if (!isSigned) {
            toast.error("Please sign the agreement first!");
            return;
          }
      
          if (!toAddress || !amount) {
            toast.error("Please enter a valid address and amount.");
            return;
          }
      
          // Check if the amount is valid and less than the balance
          if (parseFloat(amount) > parseFloat(balance)) {
            toast.error("Insufficient balance!");
            return;
          }
      
          await transferTokens(toAddress, amount);
          setToAddress(''); // Clear fields after successful transfer
          setAmount('');
    }catch(error){
        console.error('Transfer failed:', error)
    }
 
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-2 text-center">Transfer Tokens</h2>

      <div className='text-center'>
      <button
        onClick={() => handleSignAgreement(signer)}
        className="mb-4 px-4 py-2 bg-green-500 text-center text-white rounded-md hover:bg-green-600"
      >
        Agree to Terms and Conditions
      </button>
      </div>


  {console.log("isLoading",isLoading)}

      {isSigned ? (
        <>
          <div>
            <input
              type="text"
              placeholder="Recipient address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 mb-3 rounded-md bg-gray-700 text-white border border-gray-600"
            />
            <button
              onClick={handleTransfer}
              disabled={isLoading}
              className={`w-full py-2 rounded-md transition duration-200 ${
                                    isLoading
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
            >
              {isLoading ? "Transferring..." : "Transfer"}
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-400">Please agree to the terms and conditions to proceed with the transfer.</p>
      )}
    </div>
  );
}
