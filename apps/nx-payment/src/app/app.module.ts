import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

import {JwtAccessGuard, JwtAccessStrategy} from "@nest-nx-payment/common";
import {TypeOrmConfigService, User} from "@nest-nx-payment/persistence";


import {environment} from "../environments/environment";
import {PaymentModule} from "./modules/payment/payment.module";
import {UserModule} from "./modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      load: [() => environment],
      isGlobal: true,
    }),
    PaymentModule,
    UserModule
  ],
  providers: [JwtAccessGuard, JwtAccessStrategy],
})
export class AppModule {
}
