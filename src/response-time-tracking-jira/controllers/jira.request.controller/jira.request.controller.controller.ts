import { Controller, Get } from '@nestjs/common';
import {HttpModule, HttpService} from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { JiraRequestServices } from 'src/response-time-tracking-jira/services/jira-request-services/jira-request-services.service'; 

@Controller('jirarequestcontroller')
export class JiraRequestController {
    constructor(private jiraService:JiraRequestServices){}

    @Get()
    async jiraIssuesResponse():Promise<any>{

      const result = this.jiraService.get('');
      console.log(result);

      return (await result).data;
        // let result = this.http.get('https://midharmonica.atlassian.net/rest/api/3/search').pipe(
        //     map((axiosResponse: AxiosResponse) => {
              
        //         console.log('Hello World for Axios Response');
        //         console.log(axiosResponse.data);
        //       //return axiosResponse.data;
        //     })
        //   );
        // console.log("Axios Jira Res:::"+JSON.stringify(result));
        // return JSON.stringify(result);
    }
}

