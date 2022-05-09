import {All, Body, Controller, Get, Post, HttpCode, Param, Query, Redirect,Patch, Delete } from '@nestjs/common';
import { BlogsService } from 'src/blogs/blogs.service'; 
import { UserService } from 'src/response-time-tracking-jira/services/jira-request-services/user.service';
import { CreateUserDto } from 'src/response-time-tracking-jira/dtos/create-user.dto';
import { UpdateUserDto } from 'src/response-time-tracking-jira/dtos/update-user.dtos';
@Controller('users')
export class UsersController {

    constructor(private blogservice : BlogsService, private usersService : UserService){}

   

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.create();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

   // @Get("user")
    // getUserInfo(): string{
    //     return "Hello User";
    // }

    // @Get("history")
    // getUserHistory():object{
    //     return {"id":1, "name":"Fabian Paul"}
    // }

    // @Post("add-user")
    // addUser(@Body() record:any):string{
    //     console.log(record,'===')
    //     return "OK Add User";
    // }

    // @Get("list/:id")
    // //@HttpCode(404)
    // listUser(@Param() record:any):string{
    //     return "List user"+record.id;
    // }

    // @Get('list')
    // listQueryUser(@Query() record:any):string{
    //     return "List Query User Id: "+record.email;
    // }

    // @Get('version*card')
    // detailPage(@Query() record:any):string{
    //     return "Detail User";
    // }

    // @Get('blog-list')
    // async blogList():Promise<any[]>{
    //     return this.blogservice.findData();
    // }

    // @Post('blog-add')
    // blogAdd(@Body() record:any){
    //     this.blogservice.create(record);
    // }
}
