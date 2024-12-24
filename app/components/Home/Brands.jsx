"use client";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Fragment, useMemo } from "react";

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
  // Helper to generate slides
  // const generateWrappedSlides = (brandsArray, startIndex) => {
  //   const total = brandsArray.length;
  //   const row1 = [];
  //   const row2 = [];
  //   for (let i = 0; i < 10; i++) {
  //     // Calculate the wrapped index for each row
  //     row1.push(brandsArray[(startIndex + i * 2) % total]);
  //     row2.push(brandsArray[(startIndex + i * 2 + 1) % total]);
  //   }
  //   return { row1, row2 };
  // };

  // const [startIndex, setStartIndex] = useState(0); // Current start index for sliding
  // const [currentSlides, setCurrentSlides] = useState(
  //   generateWrappedSlides(brands, 0)
  // );

  // Autoplay logic to slide every 2 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setStartIndex((prevIndex) => prevIndex + 2); // Increment index by 2
  //   }, 2000);

  //   return () => clearInterval(interval); // Cleanup interval on unmount
  // }, [brands.length]);

  // Update slides whenever the startIndex changes
  // useEffect(() => {
  //   setCurrentSlides(generateWrappedSlides(brands, startIndex));
  // }, [startIndex]);

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
