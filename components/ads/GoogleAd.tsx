// components/GoogleAd.tsx
import { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2590844740735026"
        data-ad-slot="9429467109"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default GoogleAd;
