import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Stripe} from 'stripe';

enum StripeError {
  InvalidRequest = 'StripeInvalidRequestError'
}

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get('stripe.secretKey'), {
      apiVersion: '2022-11-15',
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email
    });
  }

  public async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount:amount*100,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      confirmation_method: "manual", // For 3D Security,
    })
  }


  public async confirmPayment(paymentIntentId: string, paymentMethodId: string) {
    return await this.stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    })
  }

  public async attachCreditCard(paymentMethodId: string, customerId: string) {
    return this.stripe.paymentMethods.attach(
      paymentMethodId,
      {
        customer: customerId,
      })
  }


  public async listCreditCards(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
  }

  public async setDefaultCreditCard(paymentMethodId: string, customerId: string) {
    try {
      return await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      })
    } catch (error) {
      if (error?.type === StripeError.InvalidRequest) {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException();
    }
  }
}
