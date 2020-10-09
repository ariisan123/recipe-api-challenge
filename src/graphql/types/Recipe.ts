import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Category } from "../../entity/Category";
import { CategoryType } from "./Category";
import { UserType } from "./User";

@ObjectType()
export class RecipeType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => [String])
  ingredients: string[];

  @Field((type) => UserType)
  user: UserType;

  @Field((type) => CategoryType)
  category: CategoryType;
}

@InputType()
export class IngredientsInput {
  @Field(() => [String])
  ingredients: string[];
}

@InputType()
export class NewRecipeInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => [String])
  ingredients: string[];

  @Field({ nullable: true })
  category?: string;
}

@InputType()
export class UpdateRecipeInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [String], { nullable: true })
  ingredients?: string[];

  @Field({ nullable: true })
  category?: string;
}

/* @InputType()
export class RecipeFilterInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  ingredients: [string];
} */
