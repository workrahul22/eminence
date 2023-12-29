import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
@Schema()
export class User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  loggedIn: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
