import React from 'react';
import Banner from '../components/bannerSlider/Banner';
const HomePage = () => {
    return (
        <div className="p-4 text-lg border-t">
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between">
                    <Banner />
                </div>
            </div>
        </div>
    )
}

export default HomePage;