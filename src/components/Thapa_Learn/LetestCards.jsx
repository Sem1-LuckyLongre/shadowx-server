export const LetestCards = ({ card, indx, isDarkMode }) => {
  return (
    <a href={card.link} target="_self" className="hover:scale-105">
      <div className={`w-60 justify-center relative my-2 p-2 h-60 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} rounded-lg`}>
        <img src={card.img} className="rounded-lg" alt="" />
        <h1 className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{card.text}</h1>
        <div className="flex justify-center absolute rounded-md bottom-0 -right-3 bg-black items-center border w-14">
          <h1 className="text-4xl text-white font-mono">{indx + 1}</h1>
        </div>
      </div>
    </a>
  );
};