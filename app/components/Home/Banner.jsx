"use client";
import DOMPurify from "dompurify";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const Banner = () => {
  const [app, setApp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const language = "en";

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get("/services/buildMenu"); // Use your own API route
        const appData = response.data.data;
        setApp(appData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchFooter();
  }, []);

  // UseMemo to avoid unnecessary re-computations of sanitized content
  const sanitizedContent = useMemo(() => {
    const content =
      app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[112]?.content;

    return content
      ? DOMPurify.sanitize(content)
      : "";
  }, [app]);

  // UseMemo for the label to avoid recomputing it every render
  const bannerLabel = useMemo(() => {
    return app?.shopdata?.adiv?.[app?.shopdata?.siteid]?.[language]?.[112]?.label;
  }, [app]);

  // Early return to avoid unnecessary rendering when loading
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        className="hidden-xs"
        style={{
          background: "url(/images/banner.webp) center/cover no-repeat",
          height: "300px",
          width: "100%",
          aspectRatio: "16 / 9",
        }}
      >
        <section className="banner">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-8 col-md-offset-2">
                <h2 style={{ textAlign: "center", color: "#fff" }}>
                  {bannerLabel}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
              </div>
              <div className="col-xs-12 col-md-8 col-md-offset-2">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 text-center">
                    <Link className="orange" href="/">
                      Signup
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
