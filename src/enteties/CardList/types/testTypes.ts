import { Result, User } from '../../../shared/api/types/types.ts';

const mockUser: User = {
  id: 'user1',
  username: 'testuser',
  name: 'User',
  profile_image: {
    small: 'profile_url_small',
    medium: 'profile_url_medium',
    large: 'profile_url_large',
  },
  links: {
    self: 'self_link',
    html: 'html_link',
    photos: 'photos_link',
    likes: 'likes_link',
    portfolio: 'portfolio_link',
    following: 'following_link',
    followers: 'followers_link',
  },
  updated_at: new Date('2024-01-01T00:00:00Z'),
  first_name: '',
  last_name: null,
  twitter_username: null,
  portfolio_url: null,
  bio: null,
  location: null,
  instagram_username: null,
  total_collections: 0,
  total_likes: 0,
  total_photos: 0,
  total_promoted_photos: 0,
  total_illustrations: 0,
  total_promoted_illustrations: 0,
  accepted_tos: false,
  for_hire: false,
  social: undefined,
};

const mockResults: Result[] = [
  {
    id: '1',
    alt_description: 'Description 1',
    urls: {
      small: 'url1',
      raw: '',
      full: '',
      regular: '',
      thumb: '',
      small_s3: '',
    },
    created_at: new Date('2024-01-01T00:00:00Z'),
    user: mockUser,
  },
];

export const emptyMockResults: Result[] = [];

export const mockProps = {
  results: mockResults,
};
