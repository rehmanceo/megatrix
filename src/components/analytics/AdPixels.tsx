import Script from "next/script";

/**
 * Base tags for GA4 and the Meta Pixel. Both are no-ops until the matching
 * env var is set (NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_META_PIXEL_ID) — nothing
 * loads, and window.gtag / window.fbq stay undefined, so every call in
 * src/lib/analytics.ts safely no-ops via optional chaining until then.
 */
export function AdPixels() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {ga4Id ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${ga4Id}');`}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}
