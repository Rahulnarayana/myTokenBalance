import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  avalancheFuji,
  bscTestnet,
  etherlinkTestnet,
  fantomTestnet,
  polygonMumbai,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: '3fbb6bba6f1de962d911bb5b5c9dba88',
  chains: [
   bscTestnet,
   polygonMumbai,
   etherlinkTestnet,
   fantomTestnet,
   avalancheFuji
  ],
});
