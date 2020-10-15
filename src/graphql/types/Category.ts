import { IsUUID, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { RecipeType } from "./Recipe";

@ObjectType()
export class CategoryType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [RecipeType], { nullable: true })
  recipes: RecipeType[];
}

@InputType()
export class findCategoryInput {
  @Field({ nullable: true })
  @IsUUID("all")
  id: string;

  @Field({ nullable: true })
  @MinLength(3)
  name: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field()
  @IsUUID("all")
  id: string;

  @Field()
  @MinLength(3)
  name: string;
}
