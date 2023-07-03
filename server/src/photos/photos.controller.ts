import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as path from 'path';
import * as crypto from 'node:crypto';
import { DiskStorageOptions, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const editFileName: DiskStorageOptions['filename'] = (req, file, callback) => {
  const fileExtName = path.extname(file.originalname);

  const fileName = `${req.params.ownerId}-${Date.now()}-${crypto
    .randomBytes(6)
    .toString('hex')}${fileExtName}`;

  callback(null, fileName);
};

const imageFileFilter: MulterOptions['fileFilter'] = (_req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: ['Apenas imagens nos formatos JPEG e PNG são permitidas'],
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      false,
    );
  }

  callback(null, true);
};

@Controller('photos')
export class PhotosController {
  @Post('upload/:ownerId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.join(
          path.join(path.dirname(require.main.filename), '..'),
          process.env.PUBLIC_ASSETS_FOLDER ?? '/public/assets',
        ),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      filename: file.filename,
    };

    return response;
  }
}
