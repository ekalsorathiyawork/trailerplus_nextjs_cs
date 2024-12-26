"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";
const Banner = () => {
  const { globalState } = useGlobalContext();
  const { initialData, isLoading, error, language } = globalState;
  const app = initialData?.menu;
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  const content =
    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[112]?.content;

  const sanitizedContent = content
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(content)
      : content
    : "";

  return (
    <>
      <div className="parallax-window hidden-xs">
        <section className="banner">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-8 col-md-offset-2">
                <h2 style={{ textAlign: "center", color: "#fff" }}>
                  {
                    app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[
                      language
                    ]?.[112]?.label
                  }
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                ></div>
              </div>
              <div className="col-xs-12 col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 text-center">
                    <Link className="orange" href="/">
                      signup
                    </Link>
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

export default Banner;
