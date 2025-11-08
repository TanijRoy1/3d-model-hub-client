import React from "react";
import { SpinnerDotted } from "spinners-react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-30">
      <SpinnerDotted
        size={60}
        thickness={121}
        speed={120}
        color="rgba(172, 57, 91, 1)"
      />
    </div>
  );
};

export default Spinner;
