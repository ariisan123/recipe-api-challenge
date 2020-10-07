import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BaseEntity
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity({ name: "categories" })
export class Category extends BaseEntity {
  @BeforeInsert()
  LowerCaseAndTim() {
    this.name = this.name.toLowerCase().trim();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  name: string;

  @OneToMany((type) => Recipe, (recipe) => recipe.category)
  recipe: Recipe;
}
