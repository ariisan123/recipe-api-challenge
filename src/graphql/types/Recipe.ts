import { IsArray, IsUUID, Length, MinLength } from "class-validator";
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

  @Field((type) => CategoryType, { nullable: true })
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
  @Length(5, 99)
  name: string;

  @Field()
  @MinLength(10)
  description: string;

  @Field((type) => [String])
  @IsArray()
  ingredients: string[];

  @Field({ nullable: true })
  @IsUUID("all")
  category?: string;
}

@InputType()
export class UpdateRecipeInput {
  @Field()
  @IsUUID("all")
  id: string;

  @Field({ nullable: true })
  @Length(5, 99)
  name?: string;

  @Field({ nullable: true })
  @MinLength(10)
  description?: string;

  @Field((type) => [String], { nullable: true })
  @IsArray()
  ingredients?: string[];

  @Field({ nullable: true })
  @IsUUID("all")
  category?: string;
}
