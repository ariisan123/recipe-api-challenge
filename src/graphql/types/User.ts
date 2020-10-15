import { IsEmail, Length, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { RecipeType } from "./Recipe";

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
  @Length(3, 99)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(5)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(5)
  password: string;
}

@ObjectType()
export class TypeToken {
  @Field()
  token: string;
}
