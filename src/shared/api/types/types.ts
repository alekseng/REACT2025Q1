export interface FetchData {
  total?: number;
  total_pages?: number;
  results: Result[] | null;
}

export interface Result {
  id: string;
  slug?: string;
  alternative_slugs?: AlternativeSlugs;
  created_at: Date;
  updated_at?: Date;
  promoted_at?: Date | null;
  width?: number;
  height?: number;
  color?: string;
  blur_hash?: string;
  description?: null | string;
  alt_description: string;
  urls: Urls;
  links?: ResultLinks;
  likes?: number;
  liked_by_user?: boolean;
  current_user_collections?: never[];
  sponsorship?: null;
  topic_submissions?: ResultTopicSubmissions;
  asset_type?: AssetType;
  user: User;
  tags?: Tag[];
}

export interface AlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}

export enum AssetType {
  Photo = 'photo',
}

export enum Type {
  LandingPage = 'landing_page',
  Search = 'search',
}

export interface ResultLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Tag {
  type: Type;
  title: string;
  source?: Source;
}

export interface Source {
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: CoverPhoto;
}

export interface CoverPhoto {
  alternative_slugs: AlternativeSlugs;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date | null;
  width: number;
  height: number;
  description: null | string;
  urls: Urls;
  links: ResultLinks;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: never[];
  sponsorship: null;
  topic_submissions: CoverPhotoTopicSubmissions;
  asset_type: AssetType;
  premium: boolean;
  plus: boolean;
  user: User;
}

export interface CoverPhotoTopicSubmissions {
  animals?: Animals;
  'color-of-water'?: Animals;
  'textures-patterns'?: Animals;
}

export interface Animals {
  status: Status;
  approved_on?: Date;
}

export enum Status {
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: null | string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social?: Social;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: null | string;
  portfolio_url: null | string;
  twitter_username: null | string;
  paypal_email: null;
}

export interface ResultTopicSubmissions {
  animals?: Animals;
  nature?: Nature;
}

export interface Nature {
  status: Status;
}

export interface CheckedCards {
  profile_name: string;
  alt_description: string;
  url: string;
  id: string;
  profile_img: string;
}
