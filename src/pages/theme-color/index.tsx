import { FC, useCallback, useEffect } from "react";
import defaultBackground from "../../assets/default-background.png";
import defaultLoginBg from "../../assets/default-login-bg.png";
import testLogin from "../../assets/test-login.jpeg";
import { getPalette, getColor, getColorContrast } from "react-img-contrast";
import { Row, Col } from "antd";

const colorList = [
  "#bf1010",
  "#bf8910",
  "#6cbf10",
  "#109fbf",
  "#102ebf",
  "#6310bf",
  "#bf10b2",
  "#bf1030",
];

const Index: FC = () => {
  // const getImgPalette = useCallback(async () => {
  //   const palette = await getPalette({ imgSrc: defaultLoginBg });
  //   const color = await getColor({ imgSrc: defaultLoginBg });
  //   const text = await getImgContrast({ imgSrc: defaultLoginBg });
  //   console.log(palette, "-", color, "-", text);
  // }, []);

  // useEffect(() => {
  //   getImgPalette();
  // }, [getImgPalette]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Row gutter={[8, 8]}>
        {colorList.map((item, index) => {
          const textColor = getColorContrast(item);
          return (
            <Col key={index} span={6}>
              <div
                style={{
                  background: item,
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: textColor }}>{item}</span>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Index;
