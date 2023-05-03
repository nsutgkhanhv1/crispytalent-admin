import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { SessionSerializer } from '@modules/auth/session.serializer';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
