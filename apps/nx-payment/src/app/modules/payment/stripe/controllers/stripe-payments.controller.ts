import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';

import {JwtAccessGuard, NxRequest} from "@nest-nx-payment/common";

import StripeService from '../stripe.service';

@Controller('stripe-payments')
@UseGuards(JwtAccessGuard)
export default class StripePaymentsController {
  constructor(
    private readonly stripeService: StripeService
  ) {
  }

  @Get('/methods')
  async get(@Req() request: NxRequest) {
    return this.stripeService.listCreditCards(request.user.stripeCustomerId)
  }

  @Post('/create')
  async create(@Body() body, @Req() request: NxRequest) {
    const paymentMethodId = body.paymentMethod
    const amount = 4
    return await this.stripeService.charge(amount, paymentMethodId, request.user.stripeCustomerId)
  }

  @Post('/confirm')
  async confirm(@Body() body, @Req() request: NxRequest) {
    const paymentMethodId = body.paymentMethod
    const paymentIntentId = body.paymentIntent
    return await this.stripeService.confirmPayment(paymentIntentId,paymentMethodId )
  }

}
