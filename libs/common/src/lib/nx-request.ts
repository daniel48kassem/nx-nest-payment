import {User} from "@nest-nx-payment/persistence";

export interface NxRequest extends Request {
  user: User
}
