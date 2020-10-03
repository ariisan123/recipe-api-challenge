import { Field, ID, InputType, ObjectType } from "type-graphql";
import { TypeCategory } from "./category";
import { TypeUser } from "./user";

interface Recipe {
  id?: string;
  name: string;
  description: string;
  ingredients: string;
  user?: TypeUser;
  category?: TypeCategory | string;
}

@ObjectType()
export class TypeRecipe implements Recipe {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  ingredients: string;

  @Field((type) => TypeUser)
  user: TypeUser;

  @Field((type) => TypeCategory)
  category: TypeCategory;
}

@InputType()
export class InputRecipe implements Recipe {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  ingredients: string;

  @Field()
  category: string;
}
