import { getAlbumById } from '../getAlbums';
import AlbumClient from '../AlbumClient';
import { notFound } from 'next/navigation';

export default async function AlbumPage({ params }: { params: Promise<{ album: string }> }) {
  // params is a Promise and must be awaited
  const { album: albumId } = await params;
  const album = getAlbumById(albumId);

  if (!album) {
    notFound();
  }

  // pass data to client component for interactivity
  return <AlbumClient album={album} />;
}
