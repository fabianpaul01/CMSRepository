
import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request, Response,NextFunction} from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    use(req:Request, res:Response,next:NextFunction){
        console.log("Request is coming...", req.headers);
        res.send('Valid Request');
        next();
    }
}