"use client";
import React from "react";
import DOMPurify from "dompurify";
import { useGlobalContext } from "@/app/context/GlobalContext";
import Trailer from "@/app/components/Home/ImageMaps/Trailer";
import BoatTrailer from "@/app/components/Home/ImageMaps/BoatTrailer";
import Caravan from "@/app/components/Home/ImageMaps/Caravan";
import PaymentLogos from "../snippets/home/PaymentLogos";

const ImageMaps = () => {
  const { globalState } = useGlobalContext();
  const { initialData, isLoading, error, language } = globalState;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  const app = initialData?.menu;

  const content =
    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[91]?.content;

  const sanitizedContent = content
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(content)
      : content
    : "";

  const headerContent =
    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[87]?.label;

  const sanitizedHeaderContent = headerContent
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(headerContent)
      : headerContent
    : "";
  return (
    <>
      <div className="home">
        <section className="image-maps">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 hidden-xs header-row">
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedHeaderContent }}
                />
              </div>
              <div className="col-lg-3 col-lg-push-9 hidden-xs">
                <div className="row">
                  <div className="col-sm-6 col-md-8 col-lg-12 uspwrap_column">
                    <div className="uspwrap">
                      <div
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                      />
                      <div
                        className="hdl hdl-bar"
                        style={{
                          display: "flex",
                          paddingBottom: "30px",
                          paddingLeft: "15px",
                          marginTop: "15px",
                        }}
                      >
                        <PaymentLogos />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-12"></div>
                </div>
              </div>
              <div className="col-xs-12 col-lg-9 col-lg-pull-3">
                <div
                  className="trailers"
                  style={{
                    height: "293px",
                    maxWidth: "1028px",
                    overflowY: "hidden",
                  }}
                >
                  <div className="swiper_init swiper-main trailer_swiper">
                    <div
                      className="swiper-wrapper_init"
                      style={{
                        display: "flex",
                        maxHeight: "273px",
                      }}
                    >
                      <div className="swiper-slide_init">
                        <Trailer />
                      </div>
                      <div className="swiper-slide_init">
                        <BoatTrailer />
                      </div>
                      <div className="swiper-slide_init">
                        <Caravan />
                      </div>
                    </div>
                    <div
                      className="swiper-scrollbar"
                      style={{ display: "none" }}
                    ></div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ImageMaps;
