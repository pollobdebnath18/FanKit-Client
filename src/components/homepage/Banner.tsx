import { useEffect } from "react";
import BannerImg from "../../assets/banner.png";
import { useCurrentUser } from "../../hooks/useCurrentUser";
const Banner = () => {
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    console.log("Current User:", currentUser);
  }, [currentUser]);

  return (
    <div>
      {/* adding img */}
      <img src={BannerImg} alt="Banner" className="w-full h-full" />
    </div>
  );
};

export default Banner;
