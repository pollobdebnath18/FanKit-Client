import BannerImg from "../../assets/banner.png";
const Banner = () => {
    return (
        <div>
        {/* adding img */}
            <img src={BannerImg} alt="Banner" className="w-full h-full" />
        </div>
    );
};

export default Banner;