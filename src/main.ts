import axios, { AxiosInstance, AxiosPromise, AxiosResponse, ResponseType } from 'axios';
import { createReadStream, ReadStream } from 'fs';
import { parse } from 'path';

const baseStorageDomain: string = 'storage.bunnycdn.com'

export class BunnyCDNStorage {
    private readonly client: AxiosInstance

    constructor(storageZoneName?: string, apiKey?: string, region?: string) {
        const storageRegion: string = region ?
            region : process.env.BUNNY_CDN_REGION || ''

        const storageHost: string = storageRegion ? `${storageRegion}.${baseStorageDomain}` : baseStorageDomain
        const storageApiKey: string = apiKey || process.env.BUNNY_CDN_API_KEY || ''
        const storageZone: string = storageZoneName || process.env.BUNNY_CDN_STORAGE_ZONE || ''

        this.client = axios.create({
            baseURL: `https://${storageHost}/${storageZone}/`,
            headers: {
                AccessKey: storageApiKey,
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        })

    }

    async list(path?: string) : AxiosPromise<any> {
        return this.client({
            method: 'GET',
            url: path,
        })
    }

    async delete(path?: string) : AxiosPromise<any> {
        return this.client({
            method: 'DELETE',
            url: path
        })
    }

    async upload(file: Buffer, remotePath?: string) : Promise<AxiosResponse>;
    async upload(filePath: string, remotePath?: string) : Promise<AxiosResponse>;

    async upload(fileOrPath: Buffer | string, remotePath?: string) : Promise<AxiosResponse> {
        let file: (Buffer | ReadStream);
        if (!Buffer.isBuffer(fileOrPath)) {
            if (typeof remotePath === 'undefined') {
                remotePath = parse(fileOrPath).base;
            }
            file = createReadStream(fileOrPath);
        } else {
            file = fileOrPath;
        }

        const response = await this.client({
            method: 'PUT',
            url: remotePath,
            data: file
        })

        return response;
    }

    async download(filePath: string, responseType?: ResponseType) : AxiosPromise<any> {
        return this.client({
            method: 'GET',
            url: filePath,
            responseType: responseType || 'arraybuffer'
        })
    }
}
