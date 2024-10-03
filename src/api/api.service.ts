import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PrismaService } from 'src/prisma/prisma.service';

export interface ApiCredential {
  clientId: string;
  clientSecret: string;
}

@Injectable()
export class ApiService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  public async createApiCredential(userId: string): Promise<ApiCredential> {
    const apiCredential = await this.prisma.apiCredential.create({
      data: {
        userId,
      },
    });
    return apiCredential;
  }

  public async getToken(
    clientId: string,
    clientSecret: string,
  ): Promise<string> {
    const apiCredential = await this.prisma.apiCredential.findUnique({
      where: {
        clientId,
      },
    });
    if (!apiCredential) {
      throw new Error('Api credential not found');
    }
    if (apiCredential.clientSecret !== clientSecret) {
      throw new Error('Invalid client secret');
    }

    return this.jwt.sign(
      { clientId },
      {
        secret: jwtConstants.secret,
        expiresIn: '7d',
      },
    );
  }
}
