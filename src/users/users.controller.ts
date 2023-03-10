import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger/dist/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
//dependency injection of the users service
    constructor(private usersService: UsersService){
    }

    @ApiOkResponse({type: User, isArray: true})
    @Get()
    getUsers(@Query('name') name: string): User[] {
        return this.usersService.findAll(name); // get queries passed through the url and pass it to the service
    }

    //pass parameters to the controller endpoint
    @ApiOkResponse({type: User, description: 'Get user by ID'})
    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User{

        console.log(typeof id);

        const user = this.usersService.findById(id);
        if(!user){
            throw new NotFoundException();
        }
        return user;
    }

    @ApiCreatedResponse({type: User})
    @ApiBadRequestResponse() // explore lot more of these decorators
    @Post()
    createUser(@Body() body: CreateUserDto): User {
        return this.usersService.createUser(body);
    }

}
