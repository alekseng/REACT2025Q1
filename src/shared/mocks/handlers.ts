import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.unsplash.com/photos/:id', async () => {
    return HttpResponse.json({
      created_at: '2024-02-10T00:00:00Z',
      urls: { regular: 'https://example.com/image.jpg' },
      alt_description: 'Test Image',
      description: 'A beautiful test image',
      user: { name: 'Test User' },
      likes: 42,
    });
  }),
];
