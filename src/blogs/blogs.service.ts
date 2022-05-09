import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsService {
    public readonly blogs:any[]=[];

    create(data:any){
        this.blogs.push(data);
    }

    findData():any[]{
        return this.blogs;
    }
}
