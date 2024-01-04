import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export const fileValidation = {
    image:['image/png', 'image/jpeg', 'image/webp'],
    file:['application/pdf']
}

export function fileUpload(customValidation=[],customPath='public'){
    const fullPath = path.join(__dirname,`../uploads/${customPath}`);
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true});
    };
    const storage = multer.diskStorage({
        destination: (req, file, cb)=> {
            cb(null, fullPath)
          },
          filename: (req, file, cb)=> {
            file.dest=`uploads/${customPath}`
            cb(null, nanoid() + file.originalname);
          }
    })
    function fileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true);
          
        }else{
            cb("Invalid format", false);
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
}


