import { BeatLoader } from "react-spinners";

const Beat = () => {
  return (
    <div className="loader-container width-100 flex-row justify-center align-center">
      <BeatLoader
        color="black"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Beat;
