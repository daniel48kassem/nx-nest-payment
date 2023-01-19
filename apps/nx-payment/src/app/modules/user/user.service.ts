import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {User} from "@nest-nx-payment/persistence";

import StripeService from "../payment/stripe/stripe.service";
import {UserRegistrationDto} from "./dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private stripeService: StripeService
  ) {
  }

  async create(userData: UserRegistrationDto) {
    const stripeCustomer = await this.stripeService.createCustomer(userData.name, userData.email);

    const newUser = await this.usersRepository.create({
      ...userData,
      stripeCustomerId: stripeCustomer.id
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }


}
