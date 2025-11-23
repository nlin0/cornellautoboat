export type PhotoAlbum = {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  photos: string[];
  date?: string;
};

export const photoAlbums: PhotoAlbum[] = [
  {
    id: 'competition-2024',
    title: 'RoboBoat Competition 2024',
    coverImage: '/clifford2.png',
    description: 'Our team at the international RoboBoat competition',
    photos: [
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
    ],
    date: '2024',
  },
  {
    id: 'build-season',
    title: 'Build Season 2024',
    coverImage: '/clifford2.png',
    description: 'Behind the scenes of building our autonomous boat',
    photos: [
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
    ],
    date: '2024',
  },
  {
    id: 'team-events',
    title: 'Team Events',
    coverImage: '/clifford2.png',
    description: 'Social events and team bonding activities',
    photos: [
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
    ],
    date: '2024',
  },
  {
    id: 'testing',
    title: 'Testing & Development',
    coverImage: '/clifford2.png',
    description: 'Testing our boat in various conditions',
    photos: [
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
      '/clifford2.png',
    ],
    date: '2024',
  },
];

export const slideshowImages: string[] = [
  '/clifford2.png',
  '/clifford2.png',
  '/clifford2.png',
  '/clifford2.png',
  '/clifford2.png',
];

