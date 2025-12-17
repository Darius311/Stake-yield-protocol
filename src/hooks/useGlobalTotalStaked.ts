import { useReadContract, useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { STAKE_TOKEN_ADDRESS, STAKE_TOKEN_ABI, STAKE_VAULT_ADDRESS } from '../constants';

export function useGlobalTotalStaked() {
  const { isConnected } = useAccount();
  const { data, isLoading, refetch } = useReadContract({
    address: STAKE_TOKEN_ADDRESS,
    abi: STAKE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: STAKE_VAULT_ADDRESS ? [STAKE_VAULT_ADDRESS] : undefined,
    query: {
        refetchInterval: 2000,
    }
  });
    const formattedBalance = data 
    ? formatUnits(data, 18)
    : "0";

  const formatted = data ? Number(formattedBalance) : 0;
  return {
    globalStakedAmount: formatted,
    isTotalStakedLoading: isLoading,
    isTotalStakedConnected: isConnected,
    refetchGlobalTotalStaked: refetch
  };
}
