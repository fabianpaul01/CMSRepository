import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { CreateIssueDto } from "src/response-time-tracking-jira/dtos/create-issue-dto";
import { JiraIssue } from "src/response-time-tracking-jira/models/issue.entity";
import { LogDetail } from "src/response-time-tracking-jira/models/logDetail.entity";
import { Repository } from "typeorm";
import { BaseCrudService } from "./baseCrudService.service";
import { JiraRequestServices } from "./jira-request-services.service";

@Injectable()
export class IssueService{

    constructor(@InjectRepository(JiraIssue) private issueRepository ,@InjectRepository(LogDetail) private logRepo ,private jiraRequestService : JiraRequestServices){
      
    }

    async get(api: string, ...rest: any) {
        const result = this.jiraRequestService.get(api,rest);
        return result;
    }
  
    async post(api: string, bodyData: any, ...rest: any) {
      const result = this.jiraRequestService.post(api,bodyData,rest);
      return result;
    }

    //This method updates log data w.r.t updates into LogDetail Table
    async updateResponse(api: string, bodyData: any, ...rest: any) {
      const result = this.jiraRequestService.post(api,bodyData,rest);

      let arrayOfCustomObject = [];
      let arrayOfCustomObjectforIssueTable = [];
      try {

          for (let issueItem of (await result).data.issues) {
              let x1 = {
                'issueKey': issueItem.key,
              }
              arrayOfCustomObject.push(x1);
          }

          //Saving data into LogDetail table
          this.logRepo.save(arrayOfCustomObject);

          //Saving data into JiraIssue table
          arrayOfCustomObject.push(this.parseResponseToObject(result));
          arrayOfCustomObject = arrayOfCustomObject.flat();
          this.issueRepository.save(arrayOfCustomObjectforIssueTable);

          return result;
        }
        catch(err) {
          console.log(err);
        }
    }

    parseResponseToObject (result : any) {

      let arrayOfCustomObjectforIssueTable = [];
      try {

          for (let issueItem of (result).data.issues) {
              
            let x2 = {
              'issueKey': issueItem.key,
              'summary': issueItem.fields.summary,
              'changelog': []
            }

            issueItem.changelog?.histories.forEach((history) => {
              x2.changelog.push(history.items);
            });

            x2.changelog = x2.changelog.flat();
            arrayOfCustomObjectforIssueTable.push(x2);
          }

          return arrayOfCustomObjectforIssueTable;
      }
      catch(err){
        console.log("Error in Issue Service");
        console.log(err);
      }
    }

    async saveToDatabase(data : any) {
      this.issueRepository.save(data);
    }
}