import { HttpService,  } from '@nestjs/axios';
import { HttpServer, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import axios from 'axios';


@Injectable()
export class JiraRequestServices {
  //constructor(private httpService: HttpService) {}

   async get(api: string, ...rest: any) {
    
         
      const url = `${process.env.JIRA_HOST}/rest/api/3`;
      //console.log('Underlying url is: '+url);
      const result = await axios(`${url}/${api}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${'am9kb2hleDc0NkB0b25hZXRvLmNvbTppNUhQVGpTT2NHSmlRNnF1dlgwSDAwRDY='}`,
          Accept: 'application/json',
        },
      });
  
      console.log('Received result : '+result.data);
      return result;
  }

   async post(api: string, bodyData: any, ...rest: any) {
    const url = `${process.env.JIRA_HOST}/rest/api/3`;
    const result = await axios(`${url}/${api}`, {
      method: 'POST',
      data: bodyData,
      headers: {
      //   Authorization: `Basic ${Buffer.from(
      //     `${process.env.JIRA_EMAIL_ADDRESS}:${process.env.JIRA_API_KEY}`,
      //   ).toString('base64')}`,
        contentType: 'application/json',
        Authorization: `Basic ${'am9kb2hleDc0NkB0b25hZXRvLmNvbTppNUhQVGpTT2NHSmlRNnF1dlgwSDAwRDY='}`,
        Accept: 'application/json',
      },
    });
    return result;
  }
}
