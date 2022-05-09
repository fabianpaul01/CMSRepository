import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LogDetail } from "src/response-time-tracking-jira/models/logDetail.entity";
import { Repository } from "typeorm";

@Injectable()
export class LogDetailsService {

    constructor( @InjectRepository(LogDetail)
    private issueRepository: Repository<LogDetail>){
      
    }
}