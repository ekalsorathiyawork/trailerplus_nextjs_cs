import { useGlobalContext } from "@/app/context/GlobalContext";
import Image from "next/image";
import Link from "next/link";

const Trailer = () => {
  const { globalState } = useGlobalContext();
  const { initialData, isLoading, error } = globalState;
  const objects = [197848, 197774, 197776, 197766, 197774, 197809, 197729];
  const app = initialData?.menu;
  const show = objects.every((object) => app?.buildmenu?.groupsflat?.[object]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
      <h1 style={{ display: "none" }}>Aanhangeronderdelen</h1>
      <h1 style={{ display: "none" }}>name</h1>

      <div
        className="trailer"
        style={{
          height: "273px",
          overflow: "hidden",
          maxHeight: "273px",
          width: "403px",
          backgroundImage: `linear-gradient(175deg, rgba(216, 239, 197, 1) 0%, rgba(184, 224, 152, 1) 100%)`
          // backgroundImage: `url(/images/trailer.webp), linear-gradient(175deg, rgba(216, 239, 197, 1) 0%, rgba(184, 224, 152, 1) 100%)`,
        }}
      >
        <Image
          src="/images/trailer.webp"
          height={273}
          width={403}
          alt="Trailer Image"
          style={{ objectFit: 'cover' }} 
          priority
        />
        {show && (
          <>
            {objects.map((object, index) => {
              const group = app?.buildmenu?.groupsflat?.[object];

              if (!group) return null;
              
              const positions = [
                { top: "30%", left: "65%" },
                { top: "50%", left: "30%" },
                { top: "65%", left: "18%" },
                { top: "68%", left: "82%" },
                { top: "44%", left: "3%" },
                { top: "58%", left: "91%" },
                { top: "76%", left: "47%" },
              ];

              return (
                <Link
                  key={`${object}-${index}`}
                  data-toggle="tooltip"
                  data-placement="bottom"
                  data-original-title={group?.name}
                  href={`/`}
                  className="plus-green sonar"
                  style={positions?.[index]}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Trailer;
