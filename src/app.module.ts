import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsService } from './blogs/blogs.service';
import { AuthMiddleware } from './middleware/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JiraRequestModule } from './response-time-tracking-jira/jira-request-module.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './response-time-tracking-jira/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JiraRequestModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService, BlogsService],
})

export class AppModule {}
// export class AppModule implements NestModule {
//   // configure(consumer: MiddlewareConsumer) {
//   //   consumer.apply(AuthMiddleware).forRoutes('*');
//   // }
// }
