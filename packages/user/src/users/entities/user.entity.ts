import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

const createPasswordHash = (plainPassword: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
};

@Schema({ id: true, virtuals: true, versionKey: false })
export class User {
  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, set: createPasswordHash })
  password: string;

  publicFields?: any;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id;
});

UserSchema.virtual('publicFields').get(function () {
  return {
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
  };
});
