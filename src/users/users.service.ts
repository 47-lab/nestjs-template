import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface User {
  email: string;
  password: string;
  role: string;
}

export interface PrismaUser extends User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany();
  }

  async findOne(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: User): Promise<PrismaUser> {
    return this.prisma.user.create({ data: user });
  }

  async update(id: string, user: User): Promise<PrismaUser> {
    return this.prisma.user.update({ where: { id }, data: user });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
