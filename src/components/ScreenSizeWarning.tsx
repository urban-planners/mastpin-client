import { BsExclamationTriangle } from "react-icons/bs";
import "./ScreenSizeWarning.css";
import { useState, useEffect } from "react";

const ScreenSizeWarning = () => {
  const [showScreenWarning, setShowScreenWarning] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      if (screenWidth < 900 || screenHeight < 600) setShowScreenWarning(true);
      else setShowScreenWarning(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {showScreenWarning && (
        <div className="screen__size__warning">
          <BsExclamationTriangle />
          <p>Your screen size is too small. Consider using a larger screen.</p>
        </div>
      )}
    </>
  );
};

export default ScreenSizeWarning;
