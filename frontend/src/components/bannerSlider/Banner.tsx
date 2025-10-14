import { useEffect, useState } from 'react';
import axiosInstance from "../../service/axiosInstance";

interface Banner {
  ba_idx: number;
  ba_img_path: string;
  ba_descript: string;
  ba_use: number;
}

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [index, setIndex] = useState(0);

  // const images = [
  //   '../img/index1.png',
  //   '../img/index3.png',
  //   '../img/index4.png',
  // ];

  useEffect(() => {
    // const timer = setInterval(() => {
    //   setIndex((prev) => (prev + 1) % images.length);
    // }, 3000);
    // return () => clearInterval(timer); // 타이머 잰다 
    axiosInstance.get('/api/home/bannerActive')
      .then(res => {
        const data = res.data[0]?.data ?? [];
        setBanners(data);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners]);

  if(banners.length === 0) return null;

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  }

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={`http://localhost:10000/api/home/bannerActiveFilePath?path=${encodeURIComponent(banners[index].ba_img_path)}`}
        alt={`Banner ${banners[index].ba_idx}`}
        className="object-cover w-full h-[30rem] transition duration-700 ease-in-out"
      />
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-lg hover:shadow-2xl rounded-full p-3 transition transform hover:scale-110"
      >
        <ArrowLeft className="text-gray-700" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white shadow-lg hover:shadow-2xl rounded-full p-3 transition transform hover:scale-110"
      >
        <ArrowRight className="text-gray-700" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white shadow-lg scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;