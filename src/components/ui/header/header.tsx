import { ConnectButton } from '@rainbow-me/rainbowkit';
import './header.css';

export default function Header() {
  return (
    <header>
        <h1 style={{ fontSize: '2.3em', fontWeight: 600 }}>StakeYield Protocol</h1>
        <div className="connect-button">
          <ConnectButton/>
        </div>
    </header>
    );
}