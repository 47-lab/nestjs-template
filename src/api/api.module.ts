import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [PrismaModule],
})
export class ApiModule {}
