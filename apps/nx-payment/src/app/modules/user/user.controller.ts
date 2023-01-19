import {Controller, Get} from "@nestjs/common";

import {UserRegistrationDto} from "./dto";
import {UsersService} from "./user.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {
  }

  @Get()
  async register(dto: UserRegistrationDto) {
    return await this.userService.create(dto)
  }
}
