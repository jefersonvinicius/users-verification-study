import UserUtils, { ConfirmationTypes } from '@app/utils/user';
import { classToPlain, Exclude } from 'class-transformer';
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, unique: true })
    phone: string;

    @Exclude({ toPlainOnly: true })
    @Column({ nullable: false })
    password: string;

    @Column({ default: false })
    actived: boolean;

    @Exclude({ toPlainOnly: true })
    @Column({ nullable: true, name: 'sms_confirmation_code' })
    smsConfirmationCode: string;

    @Exclude({ toPlainOnly: true })
    @Column({ nullable: true, name: 'email_confirmation_code' })
    emailConfirmationToken: string;

    @BeforeInsert()
    createConfirmationCode() {
        this.smsConfirmationCode = UserUtils.createConfirmationCode(ConfirmationTypes.Phone);
        this.emailConfirmationToken = UserUtils.createConfirmationCode(ConfirmationTypes.Email);
    }

    toJSON() {
        return classToPlain(this);
    }

    createConfirmationURL() {
        return ` http://localhost:3000/active/${this.id}/user?token=${this.emailConfirmationToken}`;
    }
}
