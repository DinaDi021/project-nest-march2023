import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import { UserEntity } from './database/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => {
        return {
          type: 'postgres',
          host: customConfigService.db_host,
          port: customConfigService.db_port,
          username: customConfigService.db_username,
          password: customConfigService.db_password,
          database: customConfigService.db_database,
          synchronize: true,
          entities: [UserEntity],
        };
      },
      inject: [CustomConfigService],
    } as TypeOrmModuleAsyncOptions),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
