import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto, FindAllDto, MongoIdDto, UserResponseDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(body);
  }

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param(new ValidationPipe({ whitelist: true })) id: MongoIdDto) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param(new ValidationPipe({ whitelist: true })) id: MongoIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param(new ValidationPipe({ whitelist: true })) id: MongoIdDto) {
    return this.usersService.remove(id);
  }

}
