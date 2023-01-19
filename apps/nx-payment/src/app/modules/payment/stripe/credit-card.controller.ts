import {Body, Controller, Get, HttpCode, Post, Req, UseGuards} from '@nestjs/common';

import {JwtAccessGuard, NxRequest} from "@nest-nx-payment/common";

import StripeService from '../stripe/stripe.service';
import {AddCreditCardDto} from "./dto";
import {SetDefaultCreditCardDto} from "./dto/set-default-credit-card";

@Controller('credit-cards')
@UseGuards(JwtAccessGuard)
export default class CreditCardsController {
  constructor(
    private readonly stripeService: StripeService
  ) {
  }

  @Post()
  async addCreditCard(@Body() creditCard: AddCreditCardDto, @Req() request: NxRequest) {
    return this.stripeService.attachCreditCard(creditCard.paymentMethodId, request.user.stripeCustomerId);
  }

  @Post('default')
  @HttpCode(200)
  async setDefaultCard(@Body() creditCard: SetDefaultCreditCardDto, @Req() request: NxRequest) {
    await this.stripeService.setDefaultCreditCard(creditCard.paymentMethodId, request.user.stripeCustomerId);
  }

  @Get()
  async getCreditCards(@Req() request: NxRequest) {
    return this.stripeService.listCreditCards(request.user.stripeCustomerId);
  }
}
