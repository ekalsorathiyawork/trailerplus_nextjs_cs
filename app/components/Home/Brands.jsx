"use client";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { useGlobalContext } from "@/app/context/GlobalContext";

const Brands = () => {
  const { globalState } = useGlobalContext();
  const { initialData, isLoading, error, language } = globalState;

  const brands = Object.values(initialData?.menu?.buildmenu?.brands || []);
  const brandContent =
    initialData?.menu?.shopdata?.adiv?.[initialData?.menu?.shopdata?.siteid]?.[
      language
    ]?.[127]?.content;
  const sanitizedBrandContent = brandContent
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(brandContent)
      : brandContent
    : "";
  const groupedBrands = brands.reduce((acc, brand, index, array) => {
    if (index % 2 === 0) {
      const pair = array.slice(index, index + 2);
      if (pair.length > 0) {
        acc.push(pair);
      }
    }
    return acc;
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }
  return (
    <section className="brands">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <p className="h2">TrailerPlus Brands</p>
            <div dangerouslySetInnerHTML={{ __html: sanitizedBrandContent }} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row" style={{ overflow: "hidden" }}>
          <div className="brandbar swiper_init swiper-main">
            <div
              id="brands-slider"
              className="swiper-wrapper_init"
              style={{ display: "flex" }}
            >
              {groupedBrands.map((brandPair, groupIndex) => (
                <div
                  key={`slide-${groupIndex}`}
                  className="swiper-slide_init"
                  style={{ width: "100px", height: "100px" }}
                >
                  {brandPair.map(
                    (brand) =>
                      brand.mediaid && (
                        <Link key={brand.slug} href={`/`}>
                          <Image
                            className="grayscale brands-slide"
                            src={`https://www.trailerplus.eu/media/${brand.mediaid}/100/${brand.medianame}`}
                            alt={brand.brandname}
                            title={brand.brandname}
                            loading="lazy"
                            width={100}
                            height={40}
                          />
                        </Link>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
