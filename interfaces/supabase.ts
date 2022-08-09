export interface Blog {
  id: number;
  created_at: string;
  title: string;
  heading: string;
  content: string;
  description: string;
  thumbnail: string;
  updated_at: string;
  author_id: string;
  published: boolean;
  slug: string;
  likes: number;
  read_time: number;
}

export interface User {
  username: string;
  id: string;
  updated_at: string | Date;
  avatar_url: string;
  website: string;
  twitter: string;
  github: string;
  bio: string;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  occupation: string;
  likes: number[];
}

export interface BlogJoin extends Blog {
  profiles: User;
}
