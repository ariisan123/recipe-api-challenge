import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BaseEntity
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity({ name: "recipes" })
export class Recipe extends BaseEntity {
  @BeforeInsert()
  private toLowerCase() {
    this.description = this.description.toLowerCase().trim();
    this.name = this.name.toLowerCase().trim();
    this.ingredients = this.ingredients.reduce((acc, element) => {
      acc.push(element.toLowerCase().trim());
      return acc;
    }, []);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "json" })
  ingredients: string[];

  @ManyToOne((type) => User, (user) => user.recipes)
  user: User;

  @ManyToOne((type) => Category, (category) => category.recipe)
  category: Category;
}
