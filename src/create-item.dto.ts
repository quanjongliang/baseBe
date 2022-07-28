import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
@ObjectType()
export class CreateItem {
  @Field()
  name: string;
  @Field()
  description: string;
}
