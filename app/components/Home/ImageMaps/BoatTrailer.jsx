import { useGlobalContext } from "@/app/context/GlobalContext";
import Image from "next/image";
import Link from "next/link";

const BoatTrailer = () => {
  const { globalState } = useGlobalContext();
  const { initialData, isLoading, error } = globalState;
  const app = initialData?.menu;
  
    if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
      <h2 style={{ display: "none" }}>Boottraileronderdelen</h2>
      <h2 style={{ display: "none" }}>name</h2>

      <div
        className="boat-trailer"
        style={{
          height: "273px",
          overflow: "hidden",
          maxHeight: "273px",
          width: "403px",
          // background: `url(/images/boottrailer.webp),`,
        }}
      >
        <Image
          src="/images/boottrailer.webp"
          height={273}
          width={403}
          alt="boottrailer Image"
          style={{ objectFit: 'cover' }} 
          priority
        />
                    <Link
                            data-toggle="tooltip"
              data-placement="bottom"
              data-original-title={app?.buildmenu?.groupsflat?.[197753]?.name}
              href={`/`}
              className="plus-blue sonar"
              style={{ top: "66%", left: "56%" }}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </Link>
          <Link
          data-toggle="tooltip"
          data-placement="bottom"
          data-original-title={app?.buildmenu?.groupsflat?.[197773]?.name}
          href={`/`}
          className="plus-blue sonar"
          style={{ top: "57%", left: "83%" }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
        <Link
          data-toggle="tooltip"
          data-placement="bottom"
          data-original-title={app?.buildmenu?.groupsflat?.[197733]?.name}
          href={`/`}
          className="plus-blue sonar"
          style={{ top: "59%", left: "73%" }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
        <Link
          data-toggle="tooltip"
          data-placement="bottom"
          data-original-title={app?.buildmenu?.groupsflat?.[197778]?.name}
          href={`/`}
          className="plus-blue sonar"
          style={{ top: "57%", left: "7%" }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
        <Link
          data-toggle="tooltip"
          data-placement="bottom"
          data-original-title={app?.buildmenu?.groupsflat?.[197912]?.name}
          href={`/`}
          className="plus-blue sonar"
          style={{ top: "50%", left: "54%" }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
        <Link
          data-toggle="tooltip"
          data-placement="bottom"
          data-original-title={app?.buildmenu?.groupsflat?.[197805]?.name}
          href={`/`}
          className="plus-blue sonar"
          style={{ top: "35%", left: "85%" }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Link>
      </div>
    </>
  );
};

export default BoatTrailer;
