'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  situation: string;
}

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Testimonials focused on mental health benefits for homeless individuals
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "After months on the streets, my anxiety was overwhelming. Having Kaiser visit me weekly at the shelter gave me something to look forward to. His calm presence helped me regulate my emotions enough to attend therapy sessions.",
      author: "Michael",
      situation: "Previously homeless for 8 months, now in transitional housing"
    },
    {
      id: 2,
      text: "The therapy dogs at the day centre were often the only reason I'd come in. On my darkest days, Ruby would sit with me without judgment. That connection kept me going when I felt totally isolated from society.",
      author: "Sarah",
      situation: "Experienced homelessness for 14 months"
    },
    {
      id: 3,
      text: "When you're homeless, your mental health deteriorates quickly. The therapy dog program gave me routine and responsibility. Walking Bella three times a week helped me rebuild my confidence and sense of purpose.",
      author: "James",
      situation: "Previously rough sleeping, now housed for 6 months"
    },
    {
      id: 4,
      text: "PTSD from military service led to my homelessness. Max was trained to recognize my panic attacks before even I could. His intervention techniques prevented countless escalations and helped me regain control.",
      author: "David",
      situation: "Veteran, previously homeless for 2 years"
    },
    {
      id: 5,
      text: "Depression made it impossible to seek help. The visiting therapy dogs at the outreach center were my first step back to connection. Daisy's unconditional acceptance showed me I was still worthy of care.",
      author: "Emma",
      situation: "Experienced hidden homelessness for 10 months"
    }
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    // Auto-advance slides every 8 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Reset animation state after transition completes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="testimonial-slider">
      <h2 className="testimonial-heading">
        <i className="fas fa-quote-left"></i> 
        How Therapy Dogs Impact Mental Health During Homelessness
      </h2>
      
      <div className="testimonial-carousel">
        <button 
          className="slider-btn prev-btn" 
          onClick={prevSlide}
          aria-label="Previous testimonial"
          disabled={isAnimating}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="testimonial-container">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
              style={{ 
                opacity: index === currentIndex ? 1 : 0,
                transform: `translateX(${(index - currentIndex) * 100}%)` 
              }}
            >
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <span className="author-name">{testimonial.author}</span>
                <span className="author-situation">{testimonial.situation}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="slider-btn next-btn" 
          onClick={nextSlide}
          aria-label="Next testimonial"
          disabled={isAnimating}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <button 
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
              }
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
