import { useEffect, useState } from 'react';
import axiosInstance from "../../service/axiosInstance";
interface Banner {
  ba_idx: number;
  ba_img_path: string;
  ba_descript: string;
  ba_use: number;
}

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

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={`http://localhost:10000/api/home/bannerActiveFilePath?path=${encodeURIComponent(banners[index].ba_img_path)}`}
        alt={`Banner ${banners[index].ba_idx}`}
        className="object-cover w-full h-[30rem] transition duration-700"
      />
    </div>
  );
};

export default Banner;