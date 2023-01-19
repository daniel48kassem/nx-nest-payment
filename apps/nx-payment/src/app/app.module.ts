import {Module} from '@nestjs/common';

import {PaymentModule} from "./modules/payment/payment.module";
import {UserModule} from "./modules/user/user.module";


@Module({
  imports: [
    PaymentModule,
    UserModule
  ],
  providers: [],
})
export class AppModule {
}
