
import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify'; // Import react-toastify
import { TOKEN_ADDRESS, TOKEN_ABI } from '../utils/tokenConfig';
const useEIP712Sign = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [error, setError] = useState('');

  const handleSignAgreement = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask to sign the agreement!");
      toast.error("MetaMask is not installed!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const domain = {
      name: "mytoken",
      version: "1",
      chainId: 97, 
      verifyingContract: TOKEN_ADDRESS, 
    };

    const types = {
      Agreement: [
        { name: "terms", type: "string" },
      ],
    };

    const value = {
      terms: "By signing this, you agree to the terms and conditions of this app.",
    };

    try {
 
      const signature = await signer._signTypedData(domain, types, value);




      setIsSigned(true);
      toast.success('You have successfully signed the agreement!');

    } catch (err) {
      setError(err.message);
      console.error("Error signing the agreement:", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return { isSigned, error, handleSignAgreement };
};

export default useEIP712Sign;
