declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    NEXT_PUBLIC_CLOUDINARY_PRESET: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_CLOUD_KEY: string;
    CLOUDINARY_CLOUD_SECRET: string;
  }
}
