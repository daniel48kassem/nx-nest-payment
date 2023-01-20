import {Global, Module} from '@nestjs/common';

import StripePaymentsController from "./stripe/controllers/stripe-payments.controller";
import CreditCardsController from "./stripe/controllers/credit-card.controller";
import StripeService from "./stripe/stripe.service";

@Global()
@Module({
  imports: [],
  providers: [StripeService],
  controllers: [CreditCardsController, StripePaymentsController],
  exports: [StripeService]
})
export class PaymentModule {
}
