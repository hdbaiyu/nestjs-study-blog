import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
// 主路径为 app
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. 固定路径：
  // 可以匹配到 get请求，http://localhost:9080/app/list
  @Get('list')
  async findAll() {
    return await this.appService.findAll();
  }

  // 可以匹配到 post请求，http://localhost:9080/app/list
  @Post('list')
  async create(@Body() post) {
    // return 'create';
    return await this.appService.create(post);
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('user_*')
  getUser() {
    return 'getUser';
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put('list/:id')
  update() {
    return 'update';
  }
}
