export const CardV = (props) => {
  const { title, id, key, userId } = props.item;

  return (
    <li
      key={key}
      className="flex px-10 py-10 flex-col justify-between items-center bg-gray-700"
    >
      <h1 className="text-red-500 text-2xl w-auto">{title}</h1>
      <h2 className="text-white text-2xl w-auto">Group: {userId}</h2>
      <h5 className="text-red-500 text-2xl w-auto">ID: {id}</h5>
    </li>
  );
};
