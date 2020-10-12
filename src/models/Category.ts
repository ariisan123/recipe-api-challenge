import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BaseEntity,
  DeleteDateColumn
} from 'typeorm';
import { Recipe } from './Recipe';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @BeforeInsert()
  LowerCaseAndTim() {
    this.name = this.name.toLowerCase().trim();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @DeleteDateColumn()
  delete_at: Date;

  @OneToMany((type) => Recipe, (recipe) => recipe.category)
  recipe: Recipe;
}
