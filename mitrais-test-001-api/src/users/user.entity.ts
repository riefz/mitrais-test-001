import { Entity, Column, PrimaryColumn } from 'typeorm';
import {Contains, IsOptional, IsISO8601, IsEmail, IsMobilePhone, IsDateString, Min, Max, IsNotEmpty} from "class-validator";

@Entity()
export class User {

    @PrimaryColumn()
    @IsNotEmpty()
    id: string;

    @Column({ length: 25 })
    @IsMobilePhone('id-ID', {message: 'Please enter valid Indonesian phone number'})
    mobile:string;

    @Column({ length: 50 })
    @IsNotEmpty()
    firstname:string;

    @Column({ length: 50 })
    @IsNotEmpty()
    lastname:string;

    @Column({ length: 10 }) 
    @IsOptional()
    // @IsISO8601()
    // @IsDateString()
    birthdate:string;

    @Column({ length: 6 }) 
    @IsOptional() 
    gender:string;

    @Column({ length: 100 }) 
    @IsEmail({}, {message: 'Please enter valid email address'})
    email:string;
}
