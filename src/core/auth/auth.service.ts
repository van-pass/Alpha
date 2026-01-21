import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DriversRepository } from 'src/modules/drivers/repositories/drivers.repository';
import { checkPassword } from 'src/shared/utils/security';

@Injectable()
export class AuthService {
  constructor(
    private readonly driversRepository: DriversRepository,
    private readonly jwtService: JwtService
  ) {}

  async loginDriver(email: string, password: string) {
    const driver = await this.driversRepository.getByEmail(email);

    if (!driver) {
      throw new UnauthorizedException('Invalid email or password.', {
        description: 'AUS-LD02'
      });
    }

    if (!(await checkPassword(password, driver.password))) {
      throw new UnauthorizedException('Invalid email or password.', {
        description: 'AUS-LD01'
      });
    }

    const payload = {
      sub: driver.id,
      email: driver.email
    };

    const token = await this.jwtService.signAsync(payload);

    return { data: { token } };
  }
}
