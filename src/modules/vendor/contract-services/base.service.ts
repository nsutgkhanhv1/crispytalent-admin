import { ethers } from 'ethers';
import { env } from '@env';
import { chainIdToRpc } from '@utils/rpc';

abstract class BaseContractService {
  protected address: string;
  protected abi: object[];
  protected contract: ethers.Contract;
  protected rpc: string;
  protected provider: ethers.providers.JsonRpcProvider;
  protected signer: ethers.Wallet;

  constructor(chainId: number | null, address: string, abi: object[]) {
    this.address = address;
    this.abi = abi;
    this.rpc = chainIdToRpc(chainId);
    this.provider = new ethers.providers.JsonRpcProvider(this.rpc);
    this.signer = new ethers.Wallet(env.wallet.privateKey, this.provider);
    this.contract = new ethers.Contract(this.address, this.abi, this.signer);
  }

  getProvider(): ethers.providers.JsonRpcProvider {
    return this.provider;
  }

  getSigner(): ethers.Wallet {
    return this.signer;
  }

  getContract(): ethers.Contract {
    return new ethers.Contract(this.address, this.abi, this.signer);
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string): void {
    this.address = address;
    this.contract = new ethers.Contract(address, this.abi, this.signer);
  }

  setAbi(abi: object[]): void {
    this.abi = abi;
    this.contract = new ethers.Contract(this.address, abi, this.signer);
  }

  // Set rpc then update provider and signer
  setChainId(chainId: number): void {
    this.rpc = chainIdToRpc(chainId);
    this.provider = new ethers.providers.JsonRpcProvider(this.rpc);
    this.signer = new ethers.Wallet(env.wallet.privateKey, this.provider);
  }

  formatTokenID(tokenId: string): number {
    return parseInt(ethers.utils.formatUnits(tokenId, 0));
  }
}
export default BaseContractService;
