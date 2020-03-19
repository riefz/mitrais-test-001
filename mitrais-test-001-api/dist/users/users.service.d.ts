import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getUsers(user: User): Promise<User[]>;
    getUser(_id: number): Promise<User[]>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(user: User): Promise<import("typeorm").DeleteResult>;
}
