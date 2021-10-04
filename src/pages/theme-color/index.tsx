import { FC, useEffect } from "react";
import defaultBackground from "../../assets/default-background.png";
import defaultLoginBg from "../../assets/default-login-bg.png";
import testLogin from "../../assets/test-login.jpeg";
import { useImgContrast, useColorContrast } from "react-img-contrast";

const divColor = "#eeeeee";

const Index: FC = () => {
  const { imgContrast } = useImgContrast({
    imgSrc: testLogin,
    xMultiple: 0.3,
    yMultiple: 0.8,
    wMultiple: 0.4,
    hMultiple: 0.2,
  });
  const { colorContrast } = useColorContrast(divColor);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${testLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ color: imgContrast }}>版权版权信息</div>
      <div style={{ width: 300, height: 300, backgroundColor: divColor }}>
        <span style={{ color: colorContrast }}>文字颜色</span>
      </div>
    </div>
  );
};

export default Index;
