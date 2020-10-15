import { IsArray, IsUUID, MinLength } from "class-validator";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class idArg {
  @Field()
  @IsUUID("all")
  id: string;
}

@ArgsType()
export class ingredientsArg {
  @Field((type) => [String])
  @IsArray()
  ingredients: string[];
}

@ArgsType()
export class nameArg {
  @Field()
  @MinLength(5)
  name: string;
}
