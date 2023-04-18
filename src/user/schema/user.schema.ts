import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";

/**
 * User schema
 */
@Schema({ collection: "users", timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  emailAddress: string;

  @Prop({ required: true })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export { UserSchema };
