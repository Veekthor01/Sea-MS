import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const images = [
    '/blog 2.webp',
    '/blog.webp',
    '/portfolio-2.webp',
    '/portfolio.webp',
    '/resume.webp',
]

interface DotsProps {
    activeIndex: number;
    images: string[];
    onClick: (index: number) => void;
}

const Dots: React.FC<DotsProps> = ({ activeIndex, images, onClick }) => {
    return (
        <div className="mt-4 mb-6 bg-black bottom-2 inset-x-0 flex justify-center">
            {images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => onClick(index)}
                    className={`h-2 w-2 rounded-full bg-white mx-2 ${
                        activeIndex === index ? 'bg-gray-600' : ''
                    }`}
                ></button>
            ))}
        </div>
    );
}

function TemplateCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

    useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevImageIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
  const nextImageIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
 
  return (
    <div className="relative bg-green-500 w-11/12 mx-auto">
        <h1 className="w-3/5 mx-auto mt-4 mb-3 font-sans text-6xl font-bold text-center leading-snug tracking-wide">
            You don't have to start from scratch
        </h1>
        <h2 className="w-4/5 mx-auto mt-3 mb-6 font-roboto text-2xl text-center leading-tight tracking-wide">
            Pick up a template and start building...
        </h2>
        <div className="relative inset-0 flex items-center justify-center px-12">
            <img
                src={images[prevImageIndex]}
                alt="previous template"
                className="max-h-96 w-3/12 object-cover rounded-lg opacity-80 mr-2"
            />
            <img
                src={images[activeIndex]}
                alt="current template"
                className="max-h-96 w-3/5 object-cover rounded-lg"
            />
            <img
                src={images[nextImageIndex]}
                alt="next template"
                className="max-h-96 w-3/12 object-cover rounded-lg opacity-80 ml-2"
            />
            <button
                onClick={prevSlide}
                className="absolute text-2xl top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-2 rounded-l-lg">
                <FaArrowLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute text-2xl top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-2 rounded-r-lg">
                <FaArrowRight />
            </button>
        </div>
        <Dots activeIndex={activeIndex} images={images} onClick={setActiveIndex} />
    </div>
);
}

export default TemplateCarousel;