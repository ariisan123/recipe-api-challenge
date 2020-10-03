import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity({ name: "recipes" })
export class Recipe {
  @BeforeInsert()
  toLowerCase() {
    this.description = this.description.toLowerCase();
    this.name = this.name.toLowerCase();
    this.ingredients = this.ingredients.toLowerCase();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  ingredients: string;

  @ManyToOne((type) => User, (user) => user.recipes)
  user: User;

  @ManyToOne((type) => Category, (category) => category.recipe)
  category: Category;
}
