import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { error } from 'console';
import { diskStorage } from 'multer';
import {extname} from 'path';

@Controller()
export class UploadController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination:'./uploads',
            filename(_,file,callback){
                const randomName = Array(5).fill(null).map(() => (Math.random() * 16 ).toString(16)).join('')  
                return callback(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    uploadFile(@UploadedFile() file){
        console.log(file)
    }   
}
