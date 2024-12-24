import Image from "next/image";
import Link from "next/link";
import React from "react";
const Blog = () => {
  return (
    <>
      <section className="news-home hidden-xs">
        <div className="container">
          <div className="row">
            <div className="col-10 col-md-8 col-lg-10 offset-lg-0">
              <Link href="/">
                <h2 className="below-frame">News From TrailerPlus</h2>
              </Link>
            </div>
            <div
              className="col-2 col-md-4 col-lg-2 text-right"
              style={{ lineHeight: "33px" }}
            ></div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-lg-3">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <Link href="/">
                    <div className="newsitem-image" style={{ height: "175px" }}>
                      <Image
                        loading="lazy"
                        className="img-responsive"
                        src={
                          "/images/is-het-ver…ogel-van-de-trekhaak-in-te-vetten-trailerplus.jpg"
                        }
                        alt="page.header"
                        width="323"
                        height="242"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="news-item">
                    <h3>Is it wise to put the tow bar ball...</h3>
                    <p>We sometimes get the question from our customers; Should I remove the ball from the tow bar?</p>
                    <p>
                      <Link href="/">Read more</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10 col-md-8 col-lg-10 offset-lg-0"></div>
            <div
              className="col-2 col-md-4 col-lg-2 text-right"
              style={{ lineHeight: "33px" }}
            >
              <Link className="orange" href="/">View all posts</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
