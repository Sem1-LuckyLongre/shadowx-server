import { useState } from "react";

export const AdvCounter = () => {
  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState(1);
  if (count > 100) setCount(count && 100);
  if (count < 0) setCount(count && 0);

  if (steps > 100) setSteps(100);
  if (steps < 1) setSteps(1);
  if (steps == 0) setSteps(1);


  return (
    <div className="w-7/12 m-auto rounded-lg p-10 bg-black border flex flex-col justify-center gap-10 items-center">
      <h1 className="text-center text-red-700 font-mono text-4xl">{count}</h1>
      <div className="flex gap-5">
        <label htmlFor="id" className="text-center text-white text-2xl">
          Steps:
        </label>
        <input
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value))}
          id="id"
          className="rounded-md outline-none bg-blue-600 px-2 text-2xl w-20 text-white"
          type="number"
        />
      </div>
      <div className="flex justify-around w-full">
        <button
          onClick={() => setCount(count + steps)}
          className="text-white hover:bg-green-700 border bg-green-600 px-5 text-2xl rounded-lg border-green-500"
        >
          Increase
        </button>
        <button
          onClick={() => setCount(count - steps)}
          className="text-white hover:bg-green-700 border bg-green-600 px-5 text-2xl rounded-lg border-green-500"
        >
          Decrease
        </button>
        <button
          onClick={() => {
            setCount(0);
            setSteps(1);
          }}
          className="text-white hover:bg-green-700 border bg-green-600 px-5 text-2xl rounded-lg border-green-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
