import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";

/**
 * Notification schema
 */
@Schema({ collection: "notifications", timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  emailAddress: string;

  @Prop({ required: true })
  notifications: string[];
}

const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.plugin(uniqueValidator);

NotificationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return obj;
};

export { NotificationSchema };
