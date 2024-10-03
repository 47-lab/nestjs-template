import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
