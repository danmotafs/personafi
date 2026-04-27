"use client";

import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

type Persona = {
  name: string;
  description: string;
  token: string;
  supporters: number;
  totalSupport: number;
};

export default function Home() {
  const { publicKey, disconnect } = useWallet();
  const [status, setStatus] = useState("");
  const [persona, setPersona] = useState<Persona | null>(null);

  const shortWallet = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : "";

  function createPersona() {
    setStatus("Creating AI merchant persona...");

    setTimeout(() => {
      setPersona({
        name:"Léo Picolé",
        description:
          "A friendly street ice cream vendor turning local customers into loyal supporters.",
        token: "LEO",
        supporters: 0,
        totalSupport: 0,
      });

      setStatus("Persona created and token simulated on Solana!");
    }, 1200);
  }

  function supportMerchant() {
    if (!persona) return;

    setStatus("Sending support transaction...");

    setTimeout(() => {
      setPersona({
        ...persona,
        supporters: persona.supporters + 1,
        totalSupport: persona.totalSupport + 0.05,
      });

      setStatus("Support sent successfully!");
    }, 1000);
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="brand">
          <div className="brand-mark">P</div>
          <h1>
            Persona<span>Fi</span>
          </h1>
        </div>

        <p className="tagline">
          Turning local merchants into digital identities <br />
          on the <strong>Solana</strong> economy.
        </p>

        <img
          className="merchant-avatar"
          src="/assets/personafi-merchant.png"
          alt="PersonaFi merchant"
        />

        <div className="wallet-card">
          {!publicKey ? (
            <>
              <h2>Connect your wallet</h2>
              <WalletMultiButton />
            </>
          ) : (
            <>
              <p className="connected">● Wallet Connected</p>

              <div className="wallet-box">
                <span>{shortWallet}</span>
              </div>

              <p className="wallet-address">{publicKey.toBase58()}</p>

              <hr />

              {!persona ? (
                <>
                  <button className="primary" onClick={createPersona}>
                    Create Persona
                  </button>
                  <small>Generate a merchant identity and simulate token minting</small>
                </>
              ) : (
                <section className="persona-panel">
                  <h2>{persona.name}</h2>
                  <p>{persona.description}</p>

                  <div className="token-pill">$ {persona.token}</div>

                  <div className="stats">
                    <div>
                      <strong>{persona.supporters}</strong>
                      <span>Supporters</span>
                    </div>

                    <div>
                      <strong>{persona.totalSupport.toFixed(2)} SOL</strong>
                      <span>Total Support</span>
                    </div>
                  </div>

                  <button className="primary" onClick={supportMerchant}>
                    Support Merchant
                  </button>
                  <small>Simulate a payment/support interaction</small>
                </section>
              )}

              <button className="secondary">My Personas</button>
              <small>View and manage your digital identities</small>

              <button className="secondary">Dashboard</button>
              <small>Track your activity and metrics</small>

              <button className="danger" onClick={disconnect}>
                Disconnect
              </button>

              {status && <p className="status">{status}</p>}
            </>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-block">
          <p>Presented by</p>
          <strong>Colosseum</strong>
        </div>

        <div className="builder">
          <img src="/assets/frontier-builder-card.png" alt="Builder avatar" />
        </div>

        <div className="hackathon">
          <img src="/assets/frontier-banner.png" alt="Solana Online Hackathon" />
        </div>

        <div className="footer-block">
          <p>Powered by</p>
          <img src="/assets/solana.png" alt="Solana" />
        </div>
      </footer>
    </main>
  );
}