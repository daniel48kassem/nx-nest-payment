import {Module} from '@nestjs/common';

import {UsersService} from "./user.service";
import {AuthController} from "./auth.controller";

@Module({
  imports: [],
  providers: [UsersService],
  controllers: [AuthController],
  exports: []
})
export class UserModule {

}
