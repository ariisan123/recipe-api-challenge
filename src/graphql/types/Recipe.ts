import { GraphQLList } from "graphql";
import { Field, ID, InputType, ObjectType } from "type-graphql";
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
  categoy: string;
}

@InputType()
export class RecipeFilterInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [String], { nullable: true })
  ingredients: [string];
}
