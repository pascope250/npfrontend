'use client';

import { useEffect, useRef } from 'react';

const AdMultiplex = () => {
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
        style={{ display: 'block', minHeight: 250 }}
        data-ad-client="ca-pub-2590844740735026"
        data-ad-slot="1118095767"
        data-ad-format="autorelaxed"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdMultiplex;
