import { CardV } from "./CardV";
import Data from "../Data.json";

export const Card = () => {
  return (
    <>
      <ul>
        {Data.map((item) => (
          <CardV key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};
