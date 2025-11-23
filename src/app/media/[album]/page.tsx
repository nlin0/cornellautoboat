'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../media.module.css';
import { photoAlbums } from '../mediaData';

export default function AlbumPage() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.album as string;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const album = photoAlbums.find((a) => a.id === albumId);

  if (!album) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.errorMessage}>
          <h2>Album not found</h2>
          <Link href="/media" className={styles.backLink}>
            ← Back to Media Gallery
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % album.photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + album.photos.length) % album.photos.length);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.albumHeader}>
        <Link href="/media" className={styles.backButton}>
          <ChevronLeft size={20} />
          Back to Gallery
        </Link>
        <h1 className={styles.albumPageTitle}>{album.title}</h1>
        <p className={styles.albumPageDescription}>{album.description}</p>
        {album.date && (
          <span className={styles.albumDate}>{album.date}</span>
        )}
      </div>

      {/* Photo Grid */}
      <div className={styles.photoGrid}>
        {album.photos.map((photo, index) => (
          <button
            key={index}
            className={styles.photoThumbnail}
            onClick={() => setSelectedImage(index)}
            aria-label={`View photo ${index + 1}`}
          >
            <Image
              src={photo}
              alt={`${album.title} - Photo ${index + 1}`}
              fill
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className={styles.lightboxClose}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <button
            className={styles.lightboxPrev}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={40} />
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={album.photos[selectedImage]}
              alt={`${album.title} - Photo ${selectedImage + 1}`}
              fill
              className={styles.lightboxImage}
              priority
            />
            <div className={styles.lightboxInfo}>
              <span className={styles.lightboxCounter}>
                {selectedImage + 1} / {album.photos.length}
              </span>
            </div>
          </div>

          <button
            className={styles.lightboxNext}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}

