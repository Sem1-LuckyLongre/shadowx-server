import { useState } from "react";

export const DarkLight = () => {
  const [toggleV, setToggleV] = useState(false);

  const Toggle = () => {
    setToggleV(!toggleV);
  };
  return (
    <>
    <div  className="cursor-pointer w-full h-full" >
      <div onClick={Toggle} className={`flex transT justify-center items-center my-10`}>
        <div
          className={`flex rounded-full transT p-5 ${
            toggleV ? "pl-36" : "justify-start"
          } items-center w-60 h-32 ${toggleV ? "bg-transparent" : "bg-transparent"}`}
        >
          <h1
            className={`text-2xl transT ${
              toggleV ? "bg-green-500" : "bg-red-500"
            } text-white p-5 rounded-full border-yellow-400`}
          >
            {toggleV ? "ON" : "OFF"}
          </h1>
        </div>
      </div>
      </div>
    </>
  );
};
