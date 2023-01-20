import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtService} from "@nestjs/jwt";

import {UsersService} from "./user.service";
import {AuthController} from "./auth.controller";


import {User} from "@nest-nx-payment/persistence";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [JwtService,UsersService],
  controllers: [AuthController],
  exports: []
})
export class UserModule {

}
