import React, { useEffect, useState } from 'react';
import { fetchBannersData } from '@/api/notion/notionService';
import { simplifyNotionBanners } from '@/api/notion/notionTransformer';
import BannerComponent, { BannerItem } from '@/components/Banner/BannerComponent';


const Banner: React.FC = () => {
  const [banners, setBanners] = useState<BannerItem[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetchBannersData();
        const simplifiedBanners = simplifyNotionBanners(response);
        const bannersData = simplifiedBanners.map((banner) => ({
          id: banner.id,
          image: banner.imageUrl || '',
          createdTime: banner.createdTime,
          lastEditedTime: banner.lastEditedTime,
          createdBy: banner.createdBy,
          lastEditedBy: banner.lastEditedBy,
          title: banner.title,
          description: banner.description,
          link: banner.link || '',
        }));
        setBanners(bannersData);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return <BannerComponent banners={[banners[1],banners[2],banners[3],banners[6]]} />;
};

export default Banner;