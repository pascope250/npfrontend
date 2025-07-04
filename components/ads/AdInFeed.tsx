'use client';

import { useEffect, useRef } from 'react';

const AdInFeed = () => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="my-10 text-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 100 }}
        data-ad-client="ca-pub-2590844740735026"
        data-ad-slot="5987279062"
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      ></ins>
    </div>
  );
};

export default AdInFeed;
