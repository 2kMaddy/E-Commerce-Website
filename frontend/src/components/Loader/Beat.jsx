import { BeatLoader } from "react-spinners";

const Beat = () => {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <BeatLoader
        color="#993df5"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Beat;
