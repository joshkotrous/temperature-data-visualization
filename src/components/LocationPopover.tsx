import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
interface Props {
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popoverOpen: boolean;
  city: string;
  state: string;
  country: string;
  coordinates: {
    x: number;
    y: number;
  };
}

const LocationPopover: React.FC<Props> = ({
  setPopoverOpen,
  popoverOpen,
  city,
  state,
  country,
  coordinates,
}) => {
  return (
    <div
      id="popoverContainer"
      style={{
        position: "absolute",
        left: coordinates.x,
        top: coordinates.y,
      }}
      className="flex items-center justify-center"
    >
      <Popover
        style={{ position: "relative" }}
        showArrow={true}
        isOpen={popoverOpen}
        portalContainer={document.getElementById("popoverContainer")!}
        placement="top"
      >
        <PopoverTrigger style={{ position: "relative" }}>
          <div></div>
        </PopoverTrigger>
        <PopoverContent style={{ position: "relative" }}>
          {city || state || country ? (
            <div className=" px-1 py-2 text-small font-bold">
              {city && city + (state || country ? ", " : "")}
              {state && state + (country ? ", " : "")}
              {country && country}
            </div>
          ) : (
            <div className=" px-1 py-2 text-small font-bold">
              Location Not Found
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationPopover;
