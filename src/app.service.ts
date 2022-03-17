import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { blog } from './app.user';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async findAll() {
    // return 'httpsfsfdsf';
    const qb = await getRepository(blog).createQueryBuilder('blog');
    qb.where('1 = 1');
    qb.orderBy('blog.create_time', 'DESC');

    const count = await qb.getCount();
    const query = { pageNum: 1, pageSize: 10 };
    qb.limit(10);
    qb.offset();

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }
  async create(post: any): Promise<any> {
    const { title } = post;
    const db = await getRepository(blog);

    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await db.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await db.save(post);
  }
}
