import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  BeforeInsert
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @BeforeInsert()
  LowerCaseAndTim() {
    this.email = this.email.toLowerCase().trim();
    this.name = this.name.toLowerCase().trim();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @OneToMany((type) => Recipe, (recipes) => recipes.user)
  recipes: Recipe[];
}
