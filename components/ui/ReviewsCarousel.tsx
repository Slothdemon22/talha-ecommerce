"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type WheelEvent,
} from "react";

type ReviewsCarouselProps = {
  children: ReactNode;
  className?: string;
};

export function ReviewsCarousel({ children, className = "" }: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0 });

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = Math.min(el.clientWidth * 0.72, 360);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    el.scrollBy({ left: event.deltaY, behavior: "auto" });
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || event.pointerType === "touch") return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(event.pointerId);
    el.classList.add("reviews-carousel-dragging");
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.active) return;

    const delta = event.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScrollLeft - delta;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.active) return;

    dragState.current.active = false;
    el.releasePointerCapture(event.pointerId);
    el.classList.remove("reviews-carousel-dragging");
  };

  return (
    <div className={`reviews-carousel ${className}`}>
      <div
        className={`reviews-carousel-fade reviews-carousel-fade-left ${canScrollLeft ? "reviews-carousel-fade-visible" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`reviews-carousel-fade reviews-carousel-fade-right ${canScrollRight ? "reviews-carousel-fade-visible" : ""}`}
        aria-hidden="true"
      />

      <button
        type="button"
        aria-label="Scroll reviews left"
        onClick={() => scrollByAmount("left")}
        disabled={!canScrollLeft}
        className="reviews-carousel-nav reviews-carousel-nav-left"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Scroll reviews right"
        onClick={() => scrollByAmount("right")}
        disabled={!canScrollRight}
        className="reviews-carousel-nav reviews-carousel-nav-right"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="reviews-scroll scrollbar-hide"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {children}
      </div>
    </div>
  );
}
