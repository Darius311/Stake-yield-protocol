import Card from '../card/card';
import '../card/card.css';
import { SkeletonText } from "@chakra-ui/react";

type StakeDepositInfoProps = {
  balance: number;
  isConnected: boolean;
  isLoading: boolean;
};

export default function StakeDepositInfo({ balance, isConnected, isLoading }: StakeDepositInfoProps) {
  let content;

  if (!isConnected) {
    content = <span>Connect wallet to see balance</span>;
  } else if (isLoading) {
    content = <SkeletonText noOfLines={1} height="40px" width="350px"/>;
  } else {
    content = `$${balance.toLocaleString()} USDT`;
  }

  return (
    <Card
      classname="default"
      title=<h2>Stake Deposit Info</h2>
      content=<h1>{content}</h1>
    />
  );
}
