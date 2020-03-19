import { Injectable, Inject } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from "class-validator";
import { Repository } from 'typeorm';
import { User } from './user.entity';

import * as microtime from 'microtime';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(user: User): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["mobile", "firstname", "lastname", "birthdate", "gender", "email"],
            where: [{ "id": _id }]
        });
    }

    async createUser(user: User) {
        let newId = microtime.now();
            
        let newUser = new User();
        newUser.id = 'U' + newId;
        newUser.mobile = user.mobile;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.birthdate = user.birthdate;
        newUser.gender = user.gender;
        newUser.email = user.email;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            // console.log(errors);
            // return {error:1, message: errors};
            // Get Error List
            let errorList = [];
            for (let idx = 0; idx < errors.length; idx++) {
                // const elementKeys = Object.keys(errors[idx]['constraints']);
                const element = errors[idx]['constraints'];

                // console.log(elementKeys[idx].toString());

                // console.log(element[Object.keys(element)[0]]);
                // errorList.push(element[Object.keys(element)[0]]);
                errorList.push(element);
                // errorList[elementKeys[idx].toString()] = element[Object.keys(element)[0]];
                
            }

            throw new BadRequestException(errorList);
        }


        let dupUser = await this.usersRepository.find({
            where: [{ "mobile": newUser.mobile }]
        });

        if(dupUser.length>0){
            // console.log(dupUser);
            throw new BadRequestException('This mobile number is already exists');
        }
        else{
            let dupEmail = await this.usersRepository.find({
                where: [{ "email": newUser.email }]
            });

            if(dupEmail.length>0){
                throw new BadRequestException('This email address is already exists');
            }
            else{
                console.log('PROCEED');
                return await this.usersRepository.save(newUser);
            }
        }
         
    }

    async updateUser(user: User) {
        return this.usersRepository.save(user);
    }

    async deleteUser(user: User) {
        return this.usersRepository.delete(user);
    }
}
