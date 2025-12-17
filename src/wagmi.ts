import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'StakeYield',
  projectId: 'd5268a85fe61271db8bdd050c9d54795',
  chains: [sepolia],
  ssr: false,
  transports: {
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/TTP1MqHgy4QECIZMvBx17'),
  },
});