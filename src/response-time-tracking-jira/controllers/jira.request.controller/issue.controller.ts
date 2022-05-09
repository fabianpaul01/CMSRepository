import { Controller, Get, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LogDetail } from "src/response-time-tracking-jira/models/logDetail.entity";
import { IssueService } from "src/response-time-tracking-jira/services/jira-request-services/issue.service";

@Controller('issues')
export class IssueController {

    constructor(private issueService : IssueService, @InjectRepository(LogDetail) private logRepo){}

    @Get('getData')
    async getIssueResponse():Promise<any>{

      const result = this.issueService.get('search');
      console.log('In Controller:::');
      //console.log(JSON.stringify(result));

      return (await result).data;
    }

    @Post('postData')
    async getPostResponse():Promise<any>{
      const result =   await this.issueService.post('search',{"fields": ["*all"],"expand": ["changelog"],"limit":2, "startAt":0});
      console.log('In Controller:::');
      //console.log(JSON.stringify(result.data));
      return result;
    }

    @Get('updatedData')
    async getUpdatedResponse():Promise<any> {
    
    const finalDateVal = "";
    await this.logRepo.findOne({
      order : {updated_at : 'DESC'}
    }).then(async queryResult => {
        if (queryResult != undefined) {
          var lastUpdatedDate = queryResult.updated_at;
          const finalDate = lastUpdatedDate.toISOString().split('T')[0];
          const result = this.issueService.updateResponse('search',{"fields": ["*all"],"expand": ["changelog"], "jql":"updated > "+`${finalDate}`});
          return (await result).data;
        }
        else {
          const result = this.issueService.updateResponse('search',{"fields": ["*all"],"expand": ["changelog"], "jql":"updated > 2022-05-04"});
          return (await result).data;
        }
        
    })
    }   
}


