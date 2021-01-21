import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false, unique: true })
    email!: string;

    @Column({ nullable: false, unique: true })
    phone!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ default: false })
    actived!: boolean;
}
