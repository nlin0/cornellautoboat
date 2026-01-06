'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './media.module.css';
import { getBlobUrl } from '../team/blobImageMap';
import type { PhotoAlbum } from './mediaData';

interface MediaClientProps {
  photoAlbums: PhotoAlbum[];
  slideshowImages: string[];
}

// shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MediaClient({ photoAlbums, slideshowImages }: MediaClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);
  const [randomSlideshowImages, setRandomSlideshowImages] = useState<string[]>([]);
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const albumsScrollRef = useRef<HTMLDivElement>(null);

  // initialize random images only on client side after mount to avoid hydration mismatch
  useEffect(() => {
    // gel all photos from all albums and shuffle them for slideshow
    const allPhotos = photoAlbums.flatMap(album => album.photos);
    // use all photos if we have less than 10, 
    // otherwise take 10 random ones
    const shuffledSlideshow = allPhotos.length <= 10 
      ? shuffleArray(allPhotos) 
      : shuffleArray(allPhotos).slice(0, 10);
    setRandomSlideshowImages(shuffledSlideshow);
  }, [photoAlbums]);

  // auto-move slideshow
  useEffect(() => {
    if (!randomSlideshowImages.length) return; // wait for images to load first
    
    if (isSlideshowPlaying) {
      slideshowIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % randomSlideshowImages.length);
      }, 4000);
    } else {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    }

    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    };
  }, [isSlideshowPlaying, randomSlideshowImages.length]);

  // auto-scroll albums horizontally (using CSS)
  useEffect(() => {
    const scrollElement = albumsScrollRef.current;
    if (!scrollElement) return;

    const scrollContent = scrollElement.querySelector('.albumsScroll') as HTMLElement;
    if (!scrollContent) return;

  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % randomSlideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + randomSlideshowImages.length) % randomSlideshowImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.wrapper}>
      {/* HEADER SECTION (POLAROIDs) */}
      <div className={styles.mediaIntro}>
        <div className={styles.polaroidContainer}>
          <div
            className={styles.polaroid}
            style={{
              top: '10%',
              left: 'calc(50% - 450px + 1%)',
              transform: 'rotate(-8deg)'
            }}
          >
            <Image src="/clifford2.png" alt="" width={120} height={120} className={styles.polaroidImage} />
          </div>
          <div
            className={styles.polaroid}
            style={{
              top: '20%',
              right: 'calc(50% - 450px + 3%)',
              transform: 'rotate(12deg)'
            }}
          >
            <Image src="/clifford2.png" alt="" width={100} height={100} className={styles.polaroidImage} />
          </div>
          <div
            className={styles.polaroid}
            style={{
              bottom: '15%',
              left: 'calc(50% - 450px - 2%)',
              transform: 'rotate(-5deg)'
            }}
          >
            <Image src="/clifford2.png" alt="" width={110} height={110} className={styles.polaroidImage} />
          </div>
          <div
            className={styles.polaroid}
            style={{
              bottom: '20%',
              right: 'calc(50% - 450px + 4%)',
              transform: 'rotate(10deg)'
            }}
          >
            <Image src="/clifford2.png" alt="" width={95} height={95} className={styles.polaroidImage} />
          </div>
          <div
            className={styles.polaroid}
            style={{
              top: '50%',
              left: 'calc(50% - 450px - 4%)',
              transform: 'rotate(-12deg)'
            }}
          >
            <Image src="/clifford2.png" alt="" width={105} height={105} className={styles.polaroidImage} />
          </div>
          <div
            className={styles.polaroid}
            style={{
              top: '60%',
              right: 'calc(50% - 450px + 2%)',
              transform: 'rotate(7deg)'
            }}
          >
            <Image src="/clifford2.png" alt="" width={115} height={115} className={styles.polaroidImage} />
          </div>
        </div>
        <h1 className={styles.mediaTitle}>Media Gallery</h1>

      </div>

      <div className={styles.dividerWrapper}>
        <Image
          src="/dividers/divider5.svg"
          alt=""
          width={2400}
          height={200}
          className={styles.divider}
          quality={100}
          priority
          aria-hidden="true"
        />
      </div>

      {/* SLIDESHOW SECTION */}
      <section className={styles.slideshowSection} aria-label="Featured photos">
        <h2 className={styles.albumsTitle}>Featured Photos</h2>
        <div className={styles.slideshowContainer}>
          <button
            className={styles.slideshowButton}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>

          <div className={styles.slideshow}>
            {randomSlideshowImages.length > 0 ? (
              randomSlideshowImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
                >
                  <div className={styles.slideImageContainer}>
                    <Image
                      src={getBlobUrl(image)}
                      alt={`Featured photo ${index + 1}`}
                      width={1920}
                      height={1080}
                      className={styles.slideImage}
                      priority={index === 0}
                      style={{ 
                        width: 'auto', 
                        height: 'auto', 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        imageOrientation: 'from-image'
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              // fallback to original slideshow images during SSR/initial render
              slideshowImages.map((image, index) => (
                <div
                  key={`fallback-${index}`}
                  className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
                >
                  <div className={styles.slideImageContainer}>
                    <Image
                      src={getBlobUrl(image)}
                      alt={`Featured photo ${index + 1}`}
                      width={1920}
                      height={1080}
                      className={styles.slideImage}
                      priority={index === 0}
                      style={{ 
                        width: 'auto', 
                        height: 'auto', 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        imageOrientation: 'from-image'
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            className={styles.slideshowButton}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* SLIDE INDICATORS */}
        <div className={styles.slideIndicators}>
          {(randomSlideshowImages.length > 0 ? randomSlideshowImages : slideshowImages).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* PLAY AND PAUSE BUTTON */}
        <button
          className={styles.playPauseButton}
          onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
          aria-label={isSlideshowPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isSlideshowPlaying ? '⏸' : '▶'}
        </button>
      </section>

      {/* PHOTO ALBUMS SECTION */}
      <section className={styles.albumsSection} aria-label="Photo albums">
        <h2 className={styles.albumsTitle}>Photo Albums</h2>
        <div className={styles.albumsScrollContainer} ref={albumsScrollRef}>
          <div className={styles.albumsScroll}>
            {photoAlbums.concat(photoAlbums).map((album, index) => (
              <Link
                key={`${album.id}-${index}`}
                href={`/media/${album.id}`}
                className={styles.albumCard}
              >
                <div className={styles.albumFolder}>
                  <div className={styles.folderTab}></div>
                  <div className={styles.folderBody}>
                    <div className={styles.albumImageWrapper}>
                      <Image
                        src={getBlobUrl(album.coverImage)}
                        alt={album.title}
                        fill
                        className={styles.albumImage}
                      />
                    </div>
                    <div className={styles.albumLabel}>
                      <h3 className={styles.albumTitle}>{album.title}</h3>
                      <span className={styles.albumPhotoCount}>
                        {album.photos.length} {album.photos.length === 1 ? 'photo' : 'photos'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

