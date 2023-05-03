import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly users: any[];

  constructor(private usersRepository: UsersRepository) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password:
          '$2a$10$QluPhq1CI46JkrnSi0/ep.p/QzOzbYjMLSIu2prTG76cJzzgTWcUC', //changme
        pet: { name: 'alfred', picId: 1 },
      },
      {
        userId: 2,
        username: 'chris',
        password:
          '$2a$10$.icLp2RkXx6oPeolsKIO5uTZGHpQKYP9EsJ56cMf0Zj3z3YvORMnq', //secret
        pet: { name: 'gopher', picId: 2 },
      },
      {
        userId: 3,
        username: 'maria',
        password:
          '$2a$10$XkqPyfemAD6zinXiM082iu8m1VzUzQR.JrcSzfF0wXKnJAScrEXsG', //guess
        pet: { name: 'jenny', picId: 3 },
      },
    ];
  }

  async findOne(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }
}
