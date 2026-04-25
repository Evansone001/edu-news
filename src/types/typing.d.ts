export interface BlockContent {
  _type: 'block';
  style: string;
  children: Array<{
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: BlockContent[] | string;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile: {
      bio?: string;
      image?: string;
    };
  };
  comments: Comment[];

  description: string;

  mainImage: {
    url: string;
  };
  userImage: {
    url: string;
  };
  slug: string | {
    current: string;
  };
  body: [object];
}

export interface Comment {
  userImage: {
    url: string | Blob | undefined;
    assest: {
      url: string;
    };
  };
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  likes: number;
  last: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updateAt: string;
}