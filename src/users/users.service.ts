import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}


  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        role: createUserDto.role ?? 'USER',
        tenantId: Number(createUserDto.tenantId),
      },
    });
  }


  findAll() {
    return this.prisma.user.findMany({
      include: { tenant: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: +id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  
  remove(id: number) {
    return this.prisma.user.delete({
      where: { id: +id },
    });
  }
}