import { Injectable } from "@nestjs/common";

import * as fs from 'fs';
import IFileService from "./intertfaces/file.service.interface";


@Injectable()
export default class FileService implements IFileService {
    async readfile(path: string): Promise<Buffer> {
        return fs.readFileSync(path);
    }

}