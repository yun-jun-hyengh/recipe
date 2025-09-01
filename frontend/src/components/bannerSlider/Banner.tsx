import { useEffect, useState } from 'react';

const Banner = () => {
  const [index, setIndex] = useState(0);

  const images = [
    '../img/index1.png',
    '../img/index3.png',
    '../img/index4.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer); //
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={images[index]}
        alt={`Banner ${index + 1}`}
        className="object-cover w-full h-[30rem] transition duration-700"
      />
    </div>
  );
};

export default Banner;