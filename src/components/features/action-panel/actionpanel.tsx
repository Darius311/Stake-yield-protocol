import './actionpanel.css';
import { useState, useEffect } from 'react';
import { Spinner } from "@chakra-ui/react"
import { Input, InputGroup, Button } from '@chakra-ui/react';
import CardModal from '../../card/card';
import { parseUnits } from 'viem';
import { useStakeVaultContract } from '../../../hooks/useStakeVault';
import TransactionOverlay from '../../ui/transaction-overlay/transactionoverlay';

type StakeDepositInfoProps = {
  classname: string;
  stakingBalance?: number;
  walletBalance?: number;
  onTransactionSuccess?: () => void;
};

export default function ActionPanel({ classname, stakingBalance, walletBalance, onTransactionSuccess }: StakeDepositInfoProps) {
  const [amount, setAmount] = useState('');
  const [isStaking, setIsStaking] = useState(true);
  const [hasClickedApprove, setHasClickedApprove] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false); 

  // Calculate Derived Logic
  const availableBalance = isStaking ? walletBalance : stakingBalance;
  // Renamed to avoid hook conflict
  const isUserStaked = stakingBalance !== undefined && stakingBalance > 0; 
  
  const amountInWei =
    amount.trim() === ''
      ? 0n
      : (() => {
          try {
            // REMOVE COMMAS HERE
            const cleanAmount = amount.replace(/,/g, ''); 
            return parseUnits(cleanAmount, 18);
          } catch {
            return 0n;
          }
        })();

  // 1. UPDATED DESTRUCTURING
  const {
    handleApprove,
    handleStake,
    handleUnstake,
    // Loading States
    isApprovePending,
    isApproveConfirming,
    isStakePending,
    isStakeConfirming,
    // Success States
    isApproved,
    isStaked: isTransactionSuccess
  } = useStakeVaultContract({ amount: amountInWei });

  // 2. OVERLAY LOGIC
  const isBusy = isApprovePending || isApproveConfirming || isStakePending || isStakeConfirming;
  const isSuccess = isTransactionSuccess;

  // Auto-open overlay when busy
  useEffect(() => {
    if (isBusy) setOverlayVisible(true);
  }, [isBusy]);

  // Handle overlay close & success reset
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    if (isSuccess) {
       setAmount('');
       setHasClickedApprove(false);
       if (onTransactionSuccess) onTransactionSuccess(); 
    }
  };

  // 3. EVENT HANDLERS
  function staking() {
    setAmount('');
    setIsStaking(true);
  }

  function unstaking() {
    setAmount('');
    setIsStaking(false);
  }

  const handleApproveClick = () => {
    setHasClickedApprove(true);
    handleApprove();
  };

  const toggleMax = () => {
    if (isStaking){
      setAmount(walletBalance?.toLocaleString() || '');
    }
    else {
      setAmount(stakingBalance?.toLocaleString() || '');
    }
  }

  return (
    <>
      <CardModal
        classname={classname}
        content={
          <>
          <h1 id="title">StakeYield Vault</h1>
            <div className="action-buttons">
              <Button
                fontSize="2xl"
                fontWeight="600"
                onClick={staking} 
                variant="plain" 
                bg="red.400" 
                color="white"
              >
                Stake
              </Button>
              <Button 
                onClick={unstaking} 
                fontSize="2xl"
                fontWeight="600"
                variant="plain" 
                bg="red.400" 
                color="white"
                disabled={!isUserStaked}
              >
                Unstake
              </Button>
            </div>

            <div>
              <span>{isStaking ? 'Amount to Stake' : 'Amount to Unstake'}</span>
              <div className="input-field">
                <InputGroup startAddon="$" endAddon="USD">
                  <Input
                    value={amount.toLocaleString()}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </InputGroup>

                <Button
                  variant="plain"
                  fontSize="2xl"
                  bg="red.400"
                  fontWeight="500"
                  color="white"
                  onClick={toggleMax}
                  id="max-button" 
                >
                  Max
                </Button>
              </div>
            </div>

            <div className="action-panel-footer">
              <span>Available: {"$" + availableBalance?.toLocaleString() ||"$" + 0}</span>

              {/* ---------------- STAKING MODE ---------------- */}
              {isStaking && (
                <div>
                  {!isApproved && (
                    <Button
                      onClick={handleApproveClick}
                      variant="plain"
                      bg="red.400"
                      fontSize="2xl"
                      fontWeight="600"
                      color="white"
                      disabled={ 
                        isApproved || 
                        amountInWei === 0n || 
                        (hasClickedApprove && !isApproved)
                      }
                    >
                      {hasClickedApprove && !isApproved ? <Spinner color="white" size="md" /> : 'Enter Amount'}
                    </Button>
                  )}

                  {/* Show Stake if Approved */}
                  {isApproved && (
                    <Button
                      onClick={handleStake}
                      variant="plain"
                      bg="red.400"
                      fontSize="2xl"
                      fontWeight="600"
                      color="white"
                      disabled={isStakePending || amountInWei === 0n}
                    >
                      {isStakePending ? <Spinner color="white" size="md" /> : 'Stake'}
                    </Button>
                  )}
                </div>
              )}

              {/* ---------------- UNSTAKING MODE ---------------- */}
              {!isStaking && (
                <div>
                  <Button
                    onClick={handleUnstake}
                    fontSize="2xl"
                    fontWeight="600"
                    variant="plain"
                    bg="red.400"
                    color="white"
                    disabled={amountInWei === 0n}
                  >
                    Unstake
                  </Button>
                </div>
              )}
            </div>
          </>
        }
      />

      {/* 4. THE OVERLAY */}
      <TransactionOverlay 
        isOpen={isOverlayVisible && (isBusy || isSuccess)} 
        isPending={isBusy}
        isSuccess={isSuccess}
        onClose={handleCloseOverlay}
      />
    </>
  );
}
