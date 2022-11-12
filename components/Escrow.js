import { useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, Button } from "web3uikit";
import { abi, contractAddresses } from "../constants";
export default function Escrow() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const escrowAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [amount, setAmount] = useState("10000");
  const [balance, setBalance] = useState("0");
  const contractBalance = balance;
  const { runContractFunction: deposit } = useWeb3Contract({
    abi: abi,
    contractAddress: escrowAddress,
    functionName: "deposit",
    params: {},
    msgValue: amount,
  });
  const { runContractFunction: release } = useWeb3Contract({
    abi: abi,
    contractAddress: escrowAddress,
    functionName: "release",
    params: {},
  });
  const { runContractFunction: balanceOf } = useWeb3Contract({
    abi: abi,
    contractAddress: escrowAddress,
    functionName: "balanceOf",
    params: {},
  });
  console.log(amount);
  async function balanceOfContract() {
    const b = await balanceOf();

    document.getElementById("balance").innerHTML = b;
  }
  return (
    <div>
      <div className="flex justify-center pt-12 space-x-4">
        <Input
          label="Enter amount in WEI"
          name="deposit amount"
          onBlur={function noRefCheck() {}}
          value={amount}
          onChange={({ target }) => setAmount(target?.value)}
          type="number"
        />
        <Button
          color="blue"
          onClick={async function () {
            console.log("clicked button");
            await deposit();
            console.log("got it?");
          }}
          text="Deposit"
          theme="colored"
        />
      </div>
      <br />
      <br />
      <div className="flex justify-center space-x-20">
        <div>
          <Button
            color="blue"
            onClick={async function () {
              console.log("clicked button");
              await release();
              console.log("got it?");
            }}
            text="Release"
            theme="colored"
          />
        </div>
        <div className="flex">
          <Button
            color="blue"
            onClick={async function () {
              console.log("clicked button");
              await balanceOfContract();
              console.log("got it?");
            }}
            text="contract balance"
            theme="colored"
          />
          <span id="balance" className="pt-1 ml-2">
            {contractBalance} Eth!
          </span>
        </div>
      </div>
    </div>
  );
}
