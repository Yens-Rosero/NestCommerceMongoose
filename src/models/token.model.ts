import { ObjectId } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export interface payloadToken {
  sub: string | ObjectId;
  role: string;
}

export interface userWithId extends User {
  id: string | ObjectId;
}
