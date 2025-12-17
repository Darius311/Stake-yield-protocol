import { useStakedBalance } from './hooks/useStakedBalance';
import TotalStaked from './components/features/totalstaked';
import { useGlobalTotalStaked } from './hooks/useGlobalTotalStaked';
import WalletBalance from './components/features/walletbalance';
import StakeDepositInfo from './components/features/stakeinfo';
import { useWalletBalance } from './hooks/useWalletBalance';
import Header from './components/ui/header/header';
import ActionPanel from './components/features/action-panel/actionpanel';  


function App() {
  const { balance, isLoading, isConnected, refetchStakedBalance } = useStakedBalance();
  const { walletBalance, isWalletConnected, isWalletLoading, refetchWalletBalance } = useWalletBalance();
  const { globalStakedAmount, isTotalStakedLoading, isTotalStakedConnected, refetchGlobalTotalStaked } = useGlobalTotalStaked();

  const handleRefetchAll = () => {
    console.log("Refreshing dashboard data...");
    refetchStakedBalance();
    refetchWalletBalance();
    refetchGlobalTotalStaked();
  }

  return (
    <>
      <Header/>
      <main className="dashboard-grid">
        <StakeDepositInfo
          balance = {balance}
          isConnected = {isConnected}
          isLoading = {isLoading}
          />
        <WalletBalance
          walletBalance = {walletBalance}
          isConnected = {isWalletConnected}
          isLoading = {isWalletLoading}
          />
        <TotalStaked
          globalStakedAmount = {globalStakedAmount}
          isConnected = {isTotalStakedConnected}
          isLoading = {isTotalStakedLoading}
          />
        <ActionPanel
          classname="modal"
          stakingBalance = {balance}
          walletBalance = {walletBalance}
          onTransactionSuccess={handleRefetchAll}
        />
      </main>
    </>
  );
}

export default App;
