import { Drivers } from 'src/core/prisma/generated/client';
import { CreateDriverBody } from '../dtos/create-driver.dto';

export abstract class DriversRepository {
  abstract create(data: CreateDriverBody): Promise<Drivers>;
  abstract getByEmail(email: string): Promise<Drivers | null>;
  abstract getById(id: number): Promise<Drivers | null>;
}
