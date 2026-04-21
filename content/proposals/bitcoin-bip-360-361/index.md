---
chain: "Bitcoin"
category: "Quantum resistance"
proposalId: "bip-360-361"
title: "BIP 360 + BIP 361"
subtitle: "Pay-to-Merkle-Root output type and a phased sunset of legacy signatures to address quantum-computing risk."
status: "Draft / Contested"
affects: "~6.7M BTC with exposed public keys"
lastUpdated: "2026-04-21"
signals:
  coreImplementation: "None"
  nodeSignaling: "N/A"
  predictionMarket: "No market yet"
  historicalAnalog: "Taproot took ~4.5 years from BIP to activation"
breadcrumb:
  - label: "Bitcoin"
  - label: "Quantum resistance"
  - label: "BIP 360 + BIP 361"
---

## Level: Plain English

Bitcoin uses math puzzles to prove you own your coins. A powerful enough quantum computer could solve some of those puzzles instantly, letting thieves steal from addresses whose public keys are visible on the blockchain. BIP 360 creates a new, safer address type that hides the risky piece. BIP 361 sets a timeline to slowly freeze the old, vulnerable coins so they can't be stolen — but also can't be spent by their owners unless they move them in time.

## Level: Informed User

BIP 360 introduces Pay-to-Merkle-Root (P2MR), a new output type similar to Taproot but without the quantum-vulnerable "key-path spend." That means your public key is never revealed on-chain, closing the window for a quantum attacker to derive your private key.

BIP 361 is the migration plan. It sunsets legacy ECDSA and Schnorr signatures in three phases after activation:
- Phase A (year 3): no new deposits to vulnerable address types.
- Phase B (year 5): legacy signatures become invalid; unmigrated coins are frozen.
- Phase C (TBD): a zero-knowledge recovery path for owners who still hold their seed phrases.

About 34% of all bitcoins have exposed public keys. The proposal does not recommend an algorithm yet; that will come in a follow-up BIP.

## Level: Developer

BIP 360 defines P2MR as a SegWit version 2 output using bech32m encoding (prefix `bc1z`). It preserves the full tapscript Merkle-tree semantics but omits the internal public key, eliminating the key-path spend entirely. All spends must provide a script path and Merkle proof. This removes the long-exposure attack surface where a public key sits visible on-chain indefinitely, while keeping compatibility with Lightning, BitVM, Ark, and complex custody scripts.

Trade-offs:
- P2MR spends are larger than P2TR key-path spends because they always reveal a script path and Merkle proof.
- Fees are slightly higher, but the size increase is modest compared to typical post-quantum signature schemes.
- It is a soft fork: non-upgraded nodes see P2MR outputs as anyone-can-spend, but upgraded nodes enforce the rules.

BIP 361 attaches a consensus-level sunset to legacy signature verification. Phase A is a relay/policy rule: standard nodes reject transactions that create new outputs to P2PK, P2PKH, P2WPKH, and P2TR key-path templates. Phase B is a consensus change: the script interpreter no longer accepts ECDSA or Schnorr signatures for those legacy output types. Phase C proposes a zk-proof circuit tied to BIP-39 seed entropy, allowing owners to unlock frozen UTXOs into a P2MR output without revealing the original private key. The zk circuit is not yet specified.

The proposal explicitly does not choose a post-quantum signature algorithm. Authors expect a separate BIP for ML-DSA (Dilithium) or SLH-DSA integration. BIP 360 is therefore a preparatory structural change, not a complete post-quantum solution.

## Level: Spec

- BIP 360 draft: https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki
- BIP 361 draft: https://github.com/bitcoin/bips/blob/master/bip-0361.mediawiki
- Bitcoin Dev mailing list archive: https://groups.google.com/g/bitcoindev
- Co-author thread by Hunter Beast & Ethan Heilman: search bitcoin-dev for "Pay-to-Merkle-Root"
- Jameson Lopp's public comments: https://x.com/lopp (search "quantum sunset")
