import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Upload } from './types/upload';

@Resolver()
export class RgisterFileResolver {
  @Mutation(() => Boolean)
  async addRegisterFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: Upload,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `../../../uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
  }
}



//operations: '{"query":"mutation T($file:Upload!) {uploadFile(file:$file)}", "variables":{"file":null}}'
// map: { “0”: [“variables.file”] }
// 0   