import Card from '../card/card';
import '../card/card.css';
import { SkeletonText } from "@chakra-ui/react";

type StakeDepositInfoProps = {
  walletBalance: number;
  isConnected: boolean;
  isLoading: boolean;
};

export default function WalletBalance({ walletBalance, isConnected, isLoading }: StakeDepositInfoProps) {
  let content;

  if (!isConnected) {
    content = <span>Connect wallet to see balance</span>;
  } else if (isLoading) {
    content = <SkeletonText noOfLines={1} height="40px" width="370px"/>;
  } else {
    content = `$${walletBalance.toLocaleString()} USDT`;
  }

  return (
    <Card
      classname="default"
      title=<h2>Stake Wallet Balance</h2>
      content=<h1>{content}</h1>
    />
  );
}
