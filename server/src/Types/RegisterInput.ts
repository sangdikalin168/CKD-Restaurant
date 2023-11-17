import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  display_name: string;

  @Field()
  role: string;

  @Field()
  phone: string;
}
