import { useState } from "react";

export const Counter = () => {
  const [value, setValue] = useState(0);

  const Increase = () => {
    setValue(value + 1);
  };
  const Reset = () => {
    setValue(0)
  }

  return (
    <>
      <div className="flex border-red-200 justify-center items-center my-5 flex-col">
        <div className="p-20 my-5 flex justify-center items-center flex-col gap-5 shadow-lg hover:shadow-2xl">
          <h1 className="text-bold font-mono text-5xl">{value}</h1>
          <div className="flex gap-2">
            <button
              onClick={Increase}
              className="text-white px-4 py-2 active:scale-95 rounded-2xl hover:rounded-3xl font-serif bg-green-600  text-xl"
            >
              Increase
            </button>
            <button
              onClick={Reset}
              className="text-white px-4 py-2 active:scale-95 rounded-2xl hover:rounded-3xl font-serif bg-red-600  text-xl"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
