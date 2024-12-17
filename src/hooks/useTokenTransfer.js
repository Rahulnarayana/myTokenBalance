import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from '../utils/notifications';
import { TOKEN_ADDRESS, TOKEN_ABI } from '../utils/tokenConfig';

const useTokenTransfer = () => {
    const { data: walletClient } = useWalletClient(); // Get walletClient
    const [isLoading, setIsLoading] = useState(false);

    const transferTokens = async (to, amount) => {
        if (!walletClient) {
            toast.error('Please connect your wallet first!');
            return;
        }

        setIsLoading(true);
        try {

            const provider = new ethers.providers.Web3Provider(walletClient.transport);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

            const tx = await contract.transfer(to, ethers.utils.parseUnits(amount, 6)); // 6 decimals
            await tx.wait();

            toast.success(`Transaction successful!`, {
                onClick: () =>
                    window.open(`https://testnet.bscscan.com/tx/${tx.hash}`, '_blank'),
            });
        } catch (error) {
            toast.error(`Transaction failed: ${error.message}`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { transferTokens, isLoading };
};

export default useTokenTransfer;
