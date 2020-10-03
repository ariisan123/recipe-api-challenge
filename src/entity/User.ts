import { IsEmail } from "class-validator";
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
  toLowerCase() {
    this.email = this.email.toLowerCase();
    this.name = this.name.toLowerCase();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @OneToMany((type) => Recipe, (recipes) => recipes.user)
  recipes: Recipe[];
}
