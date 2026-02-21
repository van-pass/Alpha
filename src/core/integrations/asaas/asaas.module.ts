import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AsaasService } from './asaas.service';
import { InvoicesDataModule } from 'src/modules/invoices/invoices-data.module';

@Module({
  imports: [
    InvoicesDataModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('ASAAS_API_URL'),
        headers: {
          access_token: configService.get<string>('ASAAS_API_KEY'),
          'Content-Type': 'application/json'
        },
        timeout: 10000
      })
    })
  ],
  providers: [AsaasService],
  exports: [AsaasService]
})
export class AsaasModule {}
