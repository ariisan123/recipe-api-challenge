import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { RecipeType } from './Recipe';

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
  id: string;

  @Field({ nullable: true })
  name: string;
}

@InputType()
export class UpdateCategoryInput {
  @Field()
  id: string;

  @Field()
  name: string;
}
