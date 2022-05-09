import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/response-time-tracking-jira/dtos/update-user.dtos';
import { Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { CreateUserDto } from 'src/response-time-tracking-jira/dtos/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
        
    }

    async get (){
        return this.usersRepository.find();
    }

    
    async create (createUserDto? : CreateUserDto) : Promise<User> {
        const userObj = {
            firstName: "Vishnu",
            lastName: "Prasad",
            email: "prasad@gmail.com"
        };
        // const userDto = new CreateUserDto();
        // userDto
        return this.usersRepository.save(userObj);
    }

    async update (id:number, updateUserDto: UpdateUserDto) {

    }

    async remove (id:number) {
        await this.usersRepository.delete(id);
    }

    findOne(id:number) {

    }

    async findAll() {

    }

}
