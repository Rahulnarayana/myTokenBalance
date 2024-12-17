import { useEffect, useState } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { ethers } from 'ethers';
import { TOKEN_ADDRESS, TOKEN_ABI } from '../utils/tokenConfig';



const useTokenBalance = () => {
  const { address } = useAccount();
  const wagmiClient = usePublicClient();
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokensymbol,setTokenSymbol] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) return;

      try {
        setIsLoading(true);


        const provider = new ethers.providers.Web3Provider(wagmiClient.transport);

      
        const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);


        const rawBalance = await contract.balanceOf(address);
        const decimals = await contract.decimals();
        const symbol = await contract.symbol();
        setTokenSymbol(symbol)
        setBalance(ethers.utils.formatUnits(rawBalance, decimals));
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(null);
        setTokenSymbol("")
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [address, wagmiClient]);

  return { balance, isLoading,tokensymbol };
};

export default useTokenBalance;
