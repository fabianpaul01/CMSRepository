import { Controller, Get, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JiraIssue } from "src/response-time-tracking-jira/models/issue.entity";
import { LogDetail } from "src/response-time-tracking-jira/models/logDetail.entity";
import { IssueService } from "src/response-time-tracking-jira/services/jira-request-services/issue.service";

@Controller('issues')
export class IssueController {

    constructor(private issueService : IssueService, @InjectRepository(LogDetail) private logRepo, @InjectRepository(JiraIssue) private issueRepository){}

    @Get('getData')
    async getIssueResponse():Promise<any>{

      const result = this.issueService.get('search');
      return (await result).data;
    }

    @Post('postData')
    async getPostResponse():Promise<any>{

      try{
        console.log('In Controller:::');

        let resultData = [];
        //let startVar = 0;
        let result:any = {};
        let arrayOfCustomObject = [];

        //Pagination Call Code
        for (let startVar=0; ; startVar+=2) {
          result = await this.issueService.post('search',{"fields": ["*all"],"expand": ["changelog"], "maxResults":2, "startAt":startVar});
          console.log("Next");
          if(result.data.issues.length > 0) {
            arrayOfCustomObject.push(this.issueService.parseResponseToObject(result));
            continue;
          }
          
          break;
        }
        
        console.log("Outside do-while");
        //Inserting data into database after collection from pagination
        arrayOfCustomObject = arrayOfCustomObject.flat();
        //console.log(arrayOfCustomObject[0]);
        //console.log(arrayOfCustomObject[arrayOfCustomObject.length-1]);
        arrayOfCustomObject.forEach((res) => {
          console.log(res);
        })
        this.issueService.saveToDatabase(arrayOfCustomObject);

        return resultData;
      }
      catch (err) {
        console.log("Error in Controller");
        console.log(err);
      }
      
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


