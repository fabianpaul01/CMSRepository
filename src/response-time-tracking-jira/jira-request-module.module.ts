import { HttpModule } from '@nestjs/axios';
import { Get, Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { JiraRequestController } from './controllers/jira.request.controller/jira.request.controller.controller';
import { JiraRequestServices } from './services/jira-request-services/jira-request-services.service';
import { User } from './models/user.entity';
import { UserService } from './services/jira-request-services/user.service';
import { UsersController } from './controllers/jira.request.controller/users.controller';
import { BlogsService } from 'src/blogs/blogs.service';
import { IssueService } from './services/jira-request-services/issue.service';
import { IssueController } from './controllers/jira.request.controller/issue.controller';
import { JiraIssue } from './models/issue.entity';
import { LogDetailsService } from './services/jira-request-services/logDetailsService.service';
import { LogDetail } from './models/logDetail.entity';

@Module({
   imports:[HttpModule,TypeOrmModule.forFeature([User,JiraIssue,LogDetail])],
   controllers:[JiraRequestController,UsersController,IssueController],
   providers:[JiraRequestServices,UserService,BlogsService, IssueService,LogDetailsService]
})
export class JiraRequestModule {
    // @Get('')
    // async callJiraApi():Promise<String>{
    //     return "Hello User Axios Http";
    // }
}
