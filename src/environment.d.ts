declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            BUNNY_CDN_STORAGE_ZONE?: string;
            BUNNY_CDN_REGION?: string;
            BUNNY_CDN_API_KEY?: string;
        }
    }
}

export {}
