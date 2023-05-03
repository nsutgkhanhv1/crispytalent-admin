import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CurrenciesEntity } from '../../entity/index';
import { wrapValueWithDatetime } from '../utils/wrapValuesWithDatetime';

export default class CreateCurrencies implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const valueWithDatetime = await wrapValueWithDatetime([
      {
        id: 1,
        name: 'Tether',
        symbol: 'USDT',
        img: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Tether-USDT-icon.png',
        address: '0x1284214b9b9c85549aB3D2b972df0dEEf66aC2c9',
      },
      {
        id: 2,
        name: 'Binance coin',
        symbol: 'BNB',
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png',
        address: '0xA2959D3F95eAe5dC7D70144Ce1b73b403b7EB6E0',
      },
      {
        id: 3,
        name: 'Ethereum',
        symbol: 'ETH',
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
        address: '0xA2959D3F95eAe5dC7D43244Ce1b73b403b7EC29I',
      },
    ]);
    await connection
      .createQueryBuilder()
      .insert()
      .into(CurrenciesEntity)
      .values(valueWithDatetime)
      .execute();
  }
}
