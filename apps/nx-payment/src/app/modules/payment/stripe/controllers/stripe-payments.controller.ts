import {Body, Controller, Get, HttpCode, Post, Req, UseGuards} from '@nestjs/common';

import {JwtAccessGuard, NxRequest} from "@nest-nx-payment/common";

import StripeService from '../stripe.service';

@Controller('stripe-payments')
@UseGuards(JwtAccessGuard)
export default class StripePaymentsController {
  constructor(
    private readonly stripeService: StripeService
  ) {
  }

  @Post('/create')
  async create(@Body() body, @Req() request: NxRequest) {
    const paymentMethodId = ''
    const amount = 4
    return await this.stripeService.charge(amount, paymentMethodId, request.user.stripeCustomerId)
  }

  @Post('/confirm')
  async confirm(@Body() body, @Req() request: NxRequest) {
    const paymentMethodId = ''
    return await this.stripeService.confirmPayment(paymentMethodId, request.user.stripeCustomerId)
  }

}
