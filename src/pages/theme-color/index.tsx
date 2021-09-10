import { FC } from "react";
import defaultBackground from "../../assets/default-background.png";
import defaultLoginBg from "../../assets/default-login-bg.png";
import testLogin from "../../assets/test-login.jpeg";
import useImgTheme from "../../hooks/use-img-theme";

const Index: FC = () => {
  const { theme } = useImgTheme({
    img: testLogin,
    xMultiple: 0.3,
    yMultiple: 0.8,
    hMultiple: 0.4,
    wMultiple: 0.2,
  });

  console.log(theme, "---");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${testLogin})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ color: theme }}>版权版权信息</div>
    </div>
  );
};

export default Index;
