import {Module} from '@nestjs/common';

import {JwtAccessGuard, JwtAccessStrategy} from "@nest-nx-payment/common";

import {PaymentModule} from "./modules/payment/payment.module";
import {UserModule} from "./modules/user/user.module";

@Module({
  imports: [
    PaymentModule,
    UserModule
  ],
  providers: [JwtAccessGuard, JwtAccessStrategy],
})
export class AppModule {
}
