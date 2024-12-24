import Image from "next/image";
import React from "react";

const Caravan = () => {
  return (
    <>
      <h2 style={{ display: "none" }}>Caravanonderdelen</h2>
      <h2 style={{ display: "none" }}>name</h2>

      <div
        className="caravan"
        style={{
          height: "273px",
          overflow: "hidden",
          maxHeight: "273px",
          width: "403px",
          backgroundImage:`linear-gradient(175deg, #fed8c3 0%, #ff7d37 100%)`
          // backgroundImage:
          //   "url(/images/caravan.webp), linear-gradient(175deg, #fed8c3 0%, #ff7d37 100%)",
        }}
      >
        <Image
          src="/images/caravan.webp"
          height={273}
          width={403}
          alt="Caravan Image"
          style={{ objectFit: 'cover' }} 
          priority
        />
      </div>
    </>
  );
};

export default Caravan;
