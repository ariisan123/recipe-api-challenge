import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { RecipeType } from './Recipe';

@ObjectType()
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((type) => [RecipeType], { nullable: true })
  recipes: RecipeType[];
}

@InputType()
export class SignUpInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class TypeToken {
  @Field()
  token: string;
}
