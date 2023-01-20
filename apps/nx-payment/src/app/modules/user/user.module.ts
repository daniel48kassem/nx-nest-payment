import {Module} from '@nestjs/common';

import {UsersService} from "./user.service";
import {AuthController} from "./auth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";

import {User} from "@nest-nx-payment/persistence";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
  controllers: [AuthController],
  exports: []
})
export class UserModule {

}
