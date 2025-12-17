// useStakeVaultContract.ts
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi } from 'viem';
import { STAKE_VAULT_ABI, STAKE_VAULT_ADDRESS, STAKE_TOKEN_ADDRESS } from '../constants';

export function useStakeVaultContract({ amount }: { amount: bigint }) {
    
    // For approving
    const { 
        writeContract: approveToken, 
        data: approveTxHash, 
        isPending: isApprovePending 
    } = useWriteContract();
    
    const { 
        isLoading: isApproveConfirming, 
        isSuccess: isApproved 
    } = useWaitForTransactionReceipt({
        hash: approveTxHash,
    });

    // For staking
    const { 
        writeContract: stakeTokens, 
        data: stakeTxHash, 
        isPending: isStakePending 
    } = useWriteContract();
    
    const { 
        isLoading: isStakeConfirming, 
        isSuccess: isStaked 
    } = useWaitForTransactionReceipt({
        hash: stakeTxHash,
    });

    // Approve function
    const handleApprove = () => {
        approveToken({
            address: STAKE_TOKEN_ADDRESS,
            abi: erc20Abi,
            functionName: 'approve',
            args: [STAKE_VAULT_ADDRESS, amount],
        });
    };

    // Stake function
    const handleStake = () => {
        stakeTokens({
            address: STAKE_VAULT_ADDRESS,
            abi: STAKE_VAULT_ABI,
            functionName: 'stake',
            args: [amount],
            gas: 300000n,
        });
    };

    // Unstake function
    const handleUnstake = () => {
        stakeTokens({
            address: STAKE_VAULT_ADDRESS,
            abi: STAKE_VAULT_ABI,
            functionName: 'unstake',
            args: [amount],
            gas: 300000n
        });
    };
    console.log("DEBUG HOOK:", { approveTxHash, stakeTxHash });

    return {
        handleApprove,
        isApprovePending,
        handleUnstake,
        handleStake,
        isApproveConfirming: isApproveConfirming && !!approveTxHash,
        isApproved,
        isStakePending,
        isStakeConfirming: isStakeConfirming && !!stakeTxHash,
        isStaked,
    };
}
