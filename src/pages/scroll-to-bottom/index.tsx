import { FC } from "react";
import { debounce } from "lodash";

const Index: FC = () => {
  const testLog = () => {
    console.log("1");
  };

  const test = debounce(testLog, 500);

  return (
    <div
      onMouseMove={test}
      style={{ width: "200px", height: "200px", backgroundColor: "deeppink" }}
    >
      1
    </div>
  );
};

export default Index;
