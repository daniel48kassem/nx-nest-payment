import {Global, Module} from '@nestjs/common';

import CreditCardsController from "./stripe/credit-card.controller";
import StripeService from "./stripe/stripe.service";

@Global()
@Module({
  imports: [],
  providers: [StripeService],
  controllers: [CreditCardsController],
  exports: [StripeService]
})
export class PaymentModule {
}
