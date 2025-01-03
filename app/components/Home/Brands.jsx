"use client";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

const Brands = () => {
  const [app, setApp] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const language = "eu";
  const swiperInstances = useRef({});

  // Function to add swiper classes to elements
  const addSwiperClasses = useCallback((swiperElement) => {
    swiperElement.classList.add("swiper");
    swiperElement.querySelector(".swiper-wrapper_init")?.classList.add("swiper-wrapper");
    swiperElement.querySelectorAll(".swiper-slide_init").forEach((slide) => slide.classList.add("swiper-slide"));
  }, []);

  // Function to remove swiper classes from elements
  const removeSwiperClasses = useCallback((swiperElement) => {
    swiperElement.classList.remove("swiper");
    swiperElement.querySelector(".swiper-wrapper_init")?.classList.remove("swiper-wrapper");
    swiperElement.querySelectorAll(".swiper-slide_init").forEach((slide) => slide.classList.remove("swiper-slide"));
  }, []);

  // Initialize Swipers only when needed (optimized for mobile)
  const initSwipers = useCallback(() => {
    const swipers = document.querySelectorAll(".swiper_init");
    const isVisible = window.innerWidth <= 768;
    const width = document.documentElement.clientWidth;

    swipers.forEach((el, index) => {
      if (isVisible || el.classList.contains("brandbar") || el.classList.contains("populargroups") || el.classList.contains("trailer_swiper")) {
        if (!swiperInstances.current[index]) {
          addSwiperClasses(el);

          let swiperOptions = {
            slidesPerView: "auto",
            spaceBetween: 15,
            draggable: true,
          };

          if (el.classList.contains("swiper-products")) {
            swiperOptions.slidesPerView = 2;
            swiperOptions.spaceBetween = 5;
          } else if (el.classList.contains("trailer_swiper") && width > 1200) {
            swiperOptions.slidesPerView = 2.5;
            swiperOptions.spaceBetween = 15;
          } else if (el.classList.contains("brandbar")) {
            swiperOptions.autoplay = { delay: 3000 };
            swiperOptions.loop = true;
            swiperOptions.breakpoints = {
              300: { slidesPerView: 5, spaceBetween: 60 },
              678: { slidesPerView: 10, spaceBetween: 60 },
            };
          } else if (el.classList.contains("populargroups")) {
            swiperOptions.navigation = {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            };
          }

          if (window.Swiper) {
            swiperInstances.current[index] = new window.Swiper(el, swiperOptions);
          } else {
            console.error("Swiper is not available on window.");
          }

          el.querySelector(".fa-spinner")?.remove();
          el.querySelector(".swiper-wrapper_init")?.classList.remove("swiper_onload");
        }
      } else {
        Object.keys(swiperInstances.current).forEach((key) => {
          if (swiperInstances.current[key]) {
            removeSwiperClasses(el);
            swiperInstances.current[key].destroy(true, true);
            swiperInstances.current[key] = undefined;
          }
        });
      }
    });
  }, [addSwiperClasses, removeSwiperClasses]);

  // Fetching data and handling state updates
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get("/services/buildMenu");
        const appData = response.data.data;
        setApp(appData);
        const brandsData = Object.values(response.data.data.buildmenu?.brands || []);

        setBrands(brandsData);
        setIsLoading(false);

        const script = document.createElement("script");
        script.src = "/js/swiper-bundle.min.js";
        script.onload = () => initSwipers();
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchFooter();
    window.addEventListener("resize", initSwipers);

    return () => {
      window.removeEventListener("resize", initSwipers);
    };
  }, [initSwipers]);

  const content = app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[112]?.content;

  const sanitizedContent = content ? DOMPurify.sanitize(content) : "";

  const groupedBrands = brands.reduce((acc, brand, index, array) => {
    if (index % 2 === 0) {
      const pair = array.slice(index, index + 2);
      if (pair.length > 0) {
        acc.push(pair);
      }
    }
    return acc;
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="brands">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <p className="h2">TrailerPlus Brands</p>
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row" style={{ overflow: "hidden" }}>
          <div className="brandbar swiper_init swiper-main">
            <div id="brands-slider" className="swiper-wrapper_init" style={{ display: "flex" }}>
              {groupedBrands.map((brandPair, groupIndex) => (
                <div key={`slide-${groupIndex}`} className="swiper-slide_init" style={{ width: "100px", height: "100px" }}>
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
