import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getAll(params: any): Promise<User[]>;
    get(params: any): Promise<User[]>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    deleteUser(params: any): Promise<import("typeorm").DeleteResult>;
}
