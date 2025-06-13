const AdMultiplex = () => {
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
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </div>
  );
};
export default AdMultiplex;
