"use client";
import { useState, useEffect } from "react";

import ImageMaps from "@/app/components/Home/ImageMaps";
import Banner from "@/app/components/Home/Banner";
import PopularGroups from "@/app/components/Home/PopularGroups";
// import Blog from "@/app/components/Home/Blog";
import PopularProducts from "@/app/components/Home/PopularProducts";
import Brands from "@/app/components/Home/Brands";

import "@/public/css/swiper-bundle.min.css";


import "@/public/css/responsive-brand-logo-carousel.min.css";

export default function App() {
  const [swiperInstances, setSwiperInstances] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const addSwiperClasses = (swiperElement) => {
    swiperElement.classList.add("swiper");
    swiperElement
      .querySelector(".swiper-wrapper_init")
      ?.classList.add("swiper-wrapper");
    swiperElement
      .querySelectorAll(".swiper-slide_init")
      ?.forEach((slide) => slide.classList.add("swiper-slide"));
  };

  const removeSwiperClasses = (swiperElement) => {
    swiperElement.classList.remove("swiper");
    swiperElement
      .querySelector(".swiper-wrapper_init")
      ?.classList.remove("swiper-wrapper");
    swiperElement
      .querySelectorAll(".swiper-slide_init")
      ?.forEach((slide) => slide.classList.remove("swiper-slide"));
  };

  const initSwipers = () => {
    const swipers = document.querySelectorAll(".swiper_init");
    const isVisible = window.innerWidth <= 768;
    const width = document.documentElement.clientWidth;

    swipers.forEach((el, index) => {
      if (
        isVisible ||
        el.classList.contains("brandbar") ||
        el.classList.contains("populargroups") ||
        el.classList.contains("trailer_swiper")
      ) {
        if (!swiperInstances[index]) {
          addSwiperClasses(el);

          let swiperOptions = {
            slidesPerView: "auto",
            spaceBetween: 15,
            draggable: true,
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            //   draggable: true,
            // },
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
            swiperInstances[index] = new window.Swiper(el, swiperOptions);
          } else {
            console.error("Swiper is not available on window.");
          }

          el.querySelector(".fa-spinner")?.remove();
          el.querySelector(".swiper-wrapper_init")?.classList.remove(
            "swiper_onload"
          );

          setSwiperInstances({ ...swiperInstances });
        }
      } else {
        Object.keys(swiperInstances).forEach((key) => {
          if (swiperInstances[key] !== undefined) {
            removeSwiperClasses(el);
            swiperInstances[key].destroy(true, true);
            swiperInstances[key] = undefined;
            setSwiperInstances({ ...swiperInstances });
          }
        });
      }
    });
  };

  useEffect(() => {
    const loadSwiper = () => {
      const script = document.createElement("script");
      script.src = "/js/swiper-bundle.min.js";
      script.onload = () => initSwipers();
      document.body.appendChild(script);
    };

    loadSwiper();
    window.addEventListener("resize", initSwipers);
    return () => {
      window.removeEventListener("resize", initSwipers);
    };
  }, [swiperInstances]);

  // Check if the user has scrolled past a certain threshold
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        id="pointer-up"
        onClick={scrollUp} // Trigger the scrollUp function on click
        style={{
          display: isVisible ? "block" : "none", // Only show if the button should be visible
        }}
        className="pointer-up pointer hidden-xs" // Using your CSS class names
      >
        <i style={{ color: "#0182C5" }} className="fa fa-arrow-up fa-2x"></i>
      </div>
      <ImageMaps />
      <PopularGroups />
      {/* <Blog /> */}
      <PopularProducts />
      <section className="tyres-homepage">
        <div className="container">
          {/**
           * NOTE:: Page not exist in provided zip
           * '/pages/trailerplus-dev/tyres/include.twig'
           */}
        </div>
      </section>

      <Banner />
      <Brands />

      <style jsx global>
        {`
          .swiper-main.populargroups .swiper-slide {
            max-width: 320px;
          }

          .populargroups .swiper-button-next {
            color: #000;
            top: calc((100% - 44px) / 2) !important;
            background-color: white;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            box-shadow: 0px 0px 5px 1px #bbb;
            transition: 0.2s;
            opacity: 0.5;
            display: flex;
            justify-content: center;
          }

          .populargroups .swiper-button-prev {
            color: #000;
            top: calc((100% - 44px) / 2) !important;
            background-color: white;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            box-shadow: 0px 0px 5px 1px #bbb;
            transition: 0.2s ease;
            opacity: 0.5;
            display: flex;
            justify-content: center;
          }

          .populargroups .swiper-button-next:hover,
          .populargroups .swiper-button-prev:hover {
            opacity: 1;
          }

          .populargroups .swiper-button-prev:after,
          .populargroups .swiper-button-next:after {
            font-size: 20px;
            font-weight: 600;
          }

          .populargroups .swiper-button-prev:after {
            padding-right: 3px;
          }

          .populargroups .swiper-button-next:after {
            padding-left: 3px;
          }

          .swiper-button-disabled {
            opacity: 0.25 !important;
          }

          @media (max-width: 767px) {
            .fa-spinner {
              display: block !important;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 50px;
              z-index: 1;
              color: #0282c5;
            }

            .swiper-main.populargroups .swiper-slide {
              max-width: 192px;
            }

            .swiper_onload {
              opacity: 0;
              max-height: 472px;
              overflow: hidden;
            }

            section.image-maps div.boat-trailer,
            section.image-maps div.trailer {
              width: 100%;
            }

            section.image-maps div.trailers {
              border: none !important;
            }

            .brands img.grayscale {
              -webkit-filter: grayscale(0%);
            }

            #popularproducts .productbrand {
              background-color: none;
            }

            #popularproducts {
              min-height: 600px;
            }

            section.image-maps div.trailers {
              border: 1px solid #a9b3b8;
            }

            .swiper {
              padding-bottom: 20px;
            }

            .swiper-main {
              margin-left: -15px;
              margin-right: -15px;
              padding-bottom: 9px;
            }

            .swiper-main .swiper-scrollbar {
              left: 0px;
              right: 0px;
              bottom: 0px;
              height: 6px;
              width: 100%;
            }

            .swiper-wrapper {
              padding-left: 15px;
              padding-right: 15px;
            }

            .swiper .usp-scrollbar {
              bottom: var(--swiper-scrollbar-bottom, 0px) !important;
            }

            #brands-slider .swiper-slide img {
              display: block;
              width: 70px;
              height: 70px;
              object-fit: contain;
              opacity: 1;
            }

            .swiper-slide {
              width: 80%;
            }

            .pdl {
              padding-left: 0px !important;
            }

            section.popularproducts h2 {
              padding-bottom: 0px !important;
            }

            section.popularproducts .articlenumber {
              display: none;
            }

            section.image-maps div.trailers {
              border: none;
            }

            .productslider100,
            .productslider100 img {
              min-width: 100% !important;
              width: 100% !important;
            }

            section.popularproducts .order button img {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
}
