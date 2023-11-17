import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class GetUser {
  @Field((type) => ID)
  user_id: number;

  @Field()
  display_name: string;

  @Field()
  role: string;

  @Field()
  branch: string;
}
