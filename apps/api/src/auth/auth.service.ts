import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { SetupAdminDto } from './dto/setup-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async setup(input: SetupAdminDto) {
    if ((await this.prisma.user.count()) > 0) {
      throw new ConflictException(
        'Administrator setup has already been completed',
      );
    }
    const user = await this.prisma.user.create({
      data: {
        email: input.email.trim().toLowerCase(),
        displayName: input.displayName.trim(),
        passwordHash: await hash(input.password, 12),
      },
    });
    return this.issueToken(user);
  }

  async login(input: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.trim().toLowerCase() },
    });
    if (!user || !(await compare(input.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.issueToken(user);
  }

  private async issueToken(user: {
    id: string;
    email: string;
    displayName: string;
  }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      displayName: user.displayName,
    };
    return {
      accessToken: await this.jwt.signAsync(payload),
      user: { id: user.id, email: user.email, displayName: user.displayName },
    };
  }
}
