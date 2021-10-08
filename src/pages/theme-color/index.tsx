import { FC, useCallback, useEffect } from "react";
import defaultBackground from "../../assets/default-background.png";
import defaultLoginBg from "../../assets/default-login-bg.png";
import testLogin from "../../assets/test-login.jpeg";
import { getPalette, getColor, getTextColor } from "react-img-contrast";

const Index: FC = () => {
  const getImgPalette = useCallback(async () => {
    const palette = await getPalette({ imgSrc: defaultLoginBg });
    const color = await getColor({ imgSrc: defaultLoginBg });
    const text = await getTextColor({ imgSrc: defaultLoginBg });
    console.log(palette, "-", color, "-", text);
  }, []);

  useEffect(() => {
    getImgPalette();
  }, [getImgPalette]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1>测试本地包</h1>
      {/* <div style={{ color: imgContrast }}>版权版权信息</div>
      <div style={{ width: 300, height: 300, backgroundColor: divColor }}>
        <span style={{ color: colorContrast }}>文字颜色</span>
      </div> */}
    </div>
  );
};

export default Index;
