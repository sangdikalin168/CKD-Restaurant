import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Field()
  @Column()
  display_name!: string;

  @Field()
  @Column({ unique: true })
  phone!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @Column({ type: "date", default: () => "CURRENT_DATE" })
  created_at!: string;

  @Field()
  @Column()
  role!: string;

  @Field()
  @Column({ default: "https://randomuser.me/api/portraits/men/91.jpg" })
  image!: string;

  @Column("int", { default: 0 })
  tokenVersion!: number;
}
