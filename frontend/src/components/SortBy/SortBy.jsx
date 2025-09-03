const SortBy = (props) => {
  const { sortByData, onChangeFunction } = props;
  return (
    <select
      onChange={(e) => onChangeFunction(e.target.value)}
      className="border border-gray-300 rounded-md p-2"
    >
      <option value="">Sort by </option>
      {sortByData.map((item, index) => (
        <option value={item.value} key={index}>
          {item.displayText}
        </option>
      ))}
    </select>
  );
};

export default SortBy;
