import { useReadContract, useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { STAKE_TOKEN_ADDRESS, STAKE_TOKEN_ABI } from '../constants';

export function useWalletBalance() {
  const { address, isConnected } = useAccount();
  const { data, isLoading, refetch } = useReadContract({
    address: STAKE_TOKEN_ADDRESS,
    abi: STAKE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
        refetchInterval: 2000,
    }
  });

  const formatted = data 
    ? Number(formatUnits(data as bigint, 18)) // 18 is standard token decimals
    : 0;

  return {
    walletBalance: formatted,
    isWalletLoading: isLoading,
    isWalletConnected: isConnected,
    refetchWalletBalance: refetch
  };
}
