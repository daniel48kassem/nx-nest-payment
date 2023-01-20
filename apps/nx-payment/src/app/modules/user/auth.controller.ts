import {Body, Controller, Get, Post} from "@nestjs/common";

import {UserRegistrationDto} from "./dto";
import {LoginDto, UsersService} from "./user.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {
  }

  @Post('register')
  async register(@Body() dto: UserRegistrationDto) {
    return await this.userService.create(dto)
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.userService.login(dto)
  }
}
