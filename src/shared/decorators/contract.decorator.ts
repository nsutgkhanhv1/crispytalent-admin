import { ContractTransaction } from 'ethers';

function GetTransactionResponse<T>() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args): Promise<T> {
      const transaction = await originalMethod.apply(this, args);
      if ((<ContractTransaction>transaction).wait !== undefined) {
        return await transaction.wait(6); // 6 blocks
      }
      return transaction;
    };
    return descriptor;
  };
}

export default GetTransactionResponse;
