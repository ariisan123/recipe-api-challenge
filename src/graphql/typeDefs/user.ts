import { Field, ID, InputType, ObjectType } from "type-graphql";
import { TypeRecipe } from "./recipe";

interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}

@ObjectType()
export class TypeUser implements User {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => [TypeRecipe], { nullable: true })
  recipes: TypeRecipe[];
}

@ObjectType()
export class TypeToken {
  @Field()
  token: string;
}

@InputType()
export class SignUpUser implements User {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginUser {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  hashedPass?: string;

  @Field({ nullable: true })
  id?: string;
}
