import {Module} from '@nestjs/common';

import CreditCardsController from "./stripe/credit-card.controller";
import StripeService from "./stripe/stripe.service";

@Module({
  imports: [],
  providers: [StripeService],
  controllers: [CreditCardsController],
  exports: []
})
export class PaymentModule {
}
