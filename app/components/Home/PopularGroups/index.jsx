"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import debounce from "lodash.debounce";

const ProductGroups = () => {
  const [app, setApp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const swiperInstances = useRef([]);

  const popularProducts = useMemo(() => {
    return (
      app?.buildmenu?.groups?.find((group) => group.id === 197728)?.children ||
      []
    );
  }, [app]);

  const initializeSwiper = (el, index, options) => {
    if (swiperInstances.current[index]) return;
    swiperInstances.current[index] = new window.Swiper(el, options);
  };

  const destroySwipers = () => {
    swiperInstances.current.forEach((swiper) => {
      if (swiper) swiper.destroy(true, true);
    });
    swiperInstances.current = [];
  };

  const handleResize = debounce(() => {
    if (window.Swiper) {
      destroySwipers();
      initSwipers();
    }
  }, 200);

  const initSwipers = () => {
    const swipers = document.querySelectorAll(".swiper_init");
    const isMobile = window.innerWidth <= 768;
    swipers.forEach((el, index) => {
      const options = {
        slidesPerView: "auto",
        spaceBetween: 15,
        draggable: true,
      };

      if (el.classList.contains("populargroups")) {
        options.navigation = {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        };
      }

      if (isMobile || el.classList.contains("populargroups")) {
        initializeSwiper(el, index, options);
      }
    });
  };

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get("/services/buildMenu");
        setApp(response.data.data);
        setIsLoading(false);

        const script = document.createElement("script");
        script.src = "/js/swiper-bundle.min.js";
        script.onload = initSwipers;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchFooter();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      destroySwipers();
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="productgroups-home">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="main_h2">Popular</h2>
            <div
              className="swiper_init swiper-main populargroups"
              style={{ width: "100%" }}
            >
              <div
                className="swiper-wrapper_init"
                style={{ display: "flex", flexDirection: "row" }}
              >
                {popularProducts.slice(0, 10).map((product) => (
                  <div key={product.id} className="swiper-slide">
                    <div className="categories-panel">
                      <Link href={`/`} className="single_group">
                        <b className="single_group-title">{product.name}</b>
                        <div
                          style={{
                            width: "125px",
                            height: "125px",
                            margin: "0 auto",
                          }}
                        >
                          {product.mediaid && (
                            <Image
                              src={`https://www.trailerplus.eu/media/${product.mediaid}/125/${product.medianame}`}
                              alt={product.name}
                              title={product.name}
                              width={125}
                              height={125}
                              className="img-responsive"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <button
                          className="btn btn-xs btn-primary"
                          style={{ width: "100%", background: "#0282c5" }}
                        >
                          View all {product.name}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
              {/* <div
                  className="swiper-scrollbar"
                  style={{ display: "none" }}
                ></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGroups;
