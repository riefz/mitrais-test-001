"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const microtime = require("microtime");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers(user) {
        return await this.usersRepository.find();
    }
    async getUser(_id) {
        return await this.usersRepository.find({
            select: ["mobile", "firstname", "lastname", "birthdate", "gender", "email"],
            where: [{ "id": _id }]
        });
    }
    async createUser(user) {
        let newId = microtime.now();
        let newUser = new user_entity_1.User();
        newUser.id = 'U' + newId;
        newUser.mobile = user.mobile;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.birthdate = user.birthdate;
        newUser.gender = user.gender;
        newUser.email = user.email;
        const errors = await class_validator_1.validate(newUser);
        if (errors.length > 0) {
            let errorList = [];
            for (let idx = 0; idx < errors.length; idx++) {
                const element = errors[idx]['constraints'];
                errorList.push(element);
            }
            throw new common_2.BadRequestException(errorList);
        }
        let dupUser = await this.usersRepository.find({
            where: [{ "mobile": newUser.mobile }]
        });
        if (dupUser.length > 0) {
            throw new common_2.BadRequestException('This mobile number is already exists');
        }
        else {
            let dupEmail = await this.usersRepository.find({
                where: [{ "email": newUser.email }]
            });
            if (dupEmail.length > 0) {
                throw new common_2.BadRequestException('This email address is already exists');
            }
            else {
                console.log('PROCEED');
                return await this.usersRepository.save(newUser);
            }
        }
    }
    async updateUser(user) {
        return this.usersRepository.save(user);
    }
    async deleteUser(user) {
        return this.usersRepository.delete(user);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map