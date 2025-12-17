import Card from '../card/card';
import '../card/card.css';
import { SkeletonText } from "@chakra-ui/react";

type StakeDepositInfoProps = {
  globalStakedAmount: number;
  isConnected: boolean;
  isLoading: boolean;
};

export default function TotalStaked({ globalStakedAmount, isLoading, isConnected }: StakeDepositInfoProps) {
  let content;

  if (!isConnected) {
    content = <span>Connect wallet to see balance</span>;
  } else if (isLoading) {
    content = <SkeletonText noOfLines={1} height="40px" width="320px"/>;
  } else {
    content = `$${globalStakedAmount.toLocaleString()} USDT`;
  }

  return (
    <Card
      classname="default"
      title=<h2>{isLoading ? <SkeletonText noOfLines={1} height="36px" width="250px"/> : "Global Total Staked"}</h2>
      content=<h1>{content}</h1>
    />
  );
}
