'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './media.module.css';
import { photoAlbums, slideshowImages } from './mediaData';

export default function Media() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const albumsScrollRef = useRef<HTMLDivElement>(null);

  // Auto-advance slideshow
  useEffect(() => {
    if (isSlideshowPlaying) {
      slideshowIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
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
  }, [isSlideshowPlaying]);

  // Auto-scroll albums horizontally - using CSS animation like team stats
  useEffect(() => {
    const scrollElement = albumsScrollRef.current;
    if (!scrollElement) return;

    // Use the same approach as team stats - CSS animation with transform
    const scrollContent = scrollElement.querySelector('.albumsScroll') as HTMLElement;
    if (!scrollContent) return;

    // The CSS animation will handle the scrolling
    // We just need to ensure the content is duplicated for seamless loop
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.wrapper}>
      {/* Header Section with Polaroids */}
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

      {/* Slideshow Section */}
      <section className={styles.slideshowSection} aria-label="Featured photos">
        <div className={styles.slideshowContainer}>
          <button
            className={styles.slideshowButton}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>

          <div className={styles.slideshow}>
            {slideshowImages.map((image, index) => (
              <div
                key={index}
                className={`${styles.slide} ${index === currentSlide ? styles.slideActive : ''}`}
              >
                <Image
                  src={image}
                  alt={`Featured photo ${index + 1}`}
                  fill
                  className={styles.slideImage}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <button
            className={styles.slideshowButton}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className={styles.slideIndicators}>
          {slideshowImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          className={styles.playPauseButton}
          onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
          aria-label={isSlideshowPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isSlideshowPlaying ? '⏸' : '▶'}
        </button>
      </section>

      {/* Photo Albums Section */}
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
                        src={album.coverImage}
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
