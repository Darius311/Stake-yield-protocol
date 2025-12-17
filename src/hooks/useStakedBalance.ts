import { useReadContract, useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { STAKE_VAULT_ADDRESS, STAKE_VAULT_ABI } from '../constants';

export function useStakedBalance() {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: STAKE_VAULT_ADDRESS,
    abi: STAKE_VAULT_ABI,
    functionName: 'getStakedBalance',
    args: address ? [address] : undefined,
    query: {
        refetchInterval: 2000,
    }
  });

  const formattedBalance = data 
  ? formatUnits(data, 18)
  : "0";

  return {
    balance: data ? Number(formattedBalance) : 0,
    isLoading,
    isError,
    isConnected,
    refetchStakedBalance: refetch
  };
}
