import { AiOutlineArrowRight, AiOutlineMore } from "react-icons/ai";
import { LetestCards } from "./LetestCards";

export const Letest = ({ isDarkMode }) => {
  const letest = [
    {
      text: "ShadowX Version 1",
      img: "https://www.shutterstock.com/image-vector/first-place-related-vector-icon-600nw-2434703699.jpg",
      link: "https://sem1-luckylongre.github.io/ShadowXCheckVersion1/",
    },
    {
      text: "Guessing Game",
      img: "https://www.shutterstock.com/image-vector/hand-drawn-doodle-person-question-600nw-2494164379.jpg",
      link: "https://sem1-luckylongre.github.io/GuessingGameByShadowX/",
    },
    {
      text: "Javascript TO React",
      img: "https://www.shutterstock.com/image-vector/web-development-sign-javascript-vector-600nw-1875934654.jpg",
      link: "https://sem1-luckylongre.github.io/Roadmap_JS_to_ReactJs/",
    },
    {
      text: "Todo App",
      img: "https://www.shutterstock.com/image-vector/clipboard-online-survey-report-checklist-600nw-1436141834.jpg",
      link: "https://shdowxtodoapp.netlify.app/",
    },
  ];

  return (
    <div
      className={`flex flex-col gap-5 py-5 px-10 ${
        isDarkMode ? "bg-[#050505]" : "bg-white"
      }`}
    >
      <div className="flex justify-between">
        <h1
          className={`font-mono text-3xl ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Latest Projects
        </h1>
        <div className="flex justify-center w-16 rounded-md items-center cursor-pointer hover:border-2 hover:border-white">
          <AiOutlineMore
            size={30}
            className={isDarkMode ? "text-white" : "text-black"}
          />
          <AiOutlineArrowRight
            size={30}
            className={isDarkMode ? "text-white" : "text-black"}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap space-x-3 gap-5 justify-center items-center">
        {letest.map((card, indx) => {
          return (
            <LetestCards
              key={indx}
              card={card}
              indx={indx}
              isDarkMode={isDarkMode}
            />
          );
        })}
      </div>
    </div>
  );
};
