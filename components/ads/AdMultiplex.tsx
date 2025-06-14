import { useEffect } from 'react';

const AdMultiplex = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  return (
    <div className="my-10 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2590844740735026"
        data-ad-slot="1118095767"
        data-ad-format="autorelaxed"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdMultiplex;