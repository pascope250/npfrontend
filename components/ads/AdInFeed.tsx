const AdInFeed = () => {
  return (
    <div className="my-10 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2590844740735026"
        data-ad-slot="5987279062"
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
      ></ins>
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </div>
  );
};

export default AdInFeed;
