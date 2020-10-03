import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class TypeCategory {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
