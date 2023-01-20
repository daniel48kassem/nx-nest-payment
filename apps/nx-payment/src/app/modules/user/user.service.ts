import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Repository} from 'typeorm';
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import {compare, hash} from 'bcrypt';

import {User} from "@nest-nx-payment/persistence";

import StripeService from "../payment/stripe/stripe.service";
import {UserRegistrationDto} from "./dto";


export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 18)
  password: string;
}


export class LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private stripeService: StripeService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.user.accessToken.secret'),
      expiresIn: this.configService.get('jwt.user.accessToken.expiresIn'),
    });

    return token;
  }

  generateRefreshToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt.user.refreshToken.secret'),
      expiresIn: this.configService.get('jwt.user.refreshToken.expiresIn'),
    });
    return token;
  }

  async create(userData: UserRegistrationDto) {
    const stripeCustomer = await this.stripeService.createCustomer(userData.name, userData.email);

    const newUser = await this.usersRepository.create({
      ...userData,
      stripeCustomerId: stripeCustomer.id,
      password: await hash(userData.password,  10)
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<LoginResponse> {
    const {email, password} = loginDto;
    const user = await this.usersRepository.findOne(
      {where: {email: email}},
    );

    if (user) {
      const checkPassword = await compare(password, user.password);
      if (!checkPassword)
        throw new BadRequestException("Wrong details");

      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      };
    } else throw new BadRequestException("Wrong Details");
  }


}
