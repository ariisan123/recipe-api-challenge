import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity({ name: "categories" })
export class Category {
  @BeforeInsert()
  toLowerCase() {
    this.name = this.name.toLowerCase();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  name: string;

  @OneToMany((type) => Recipe, (recipe) => recipe.category)
  recipe: Recipe;
}
