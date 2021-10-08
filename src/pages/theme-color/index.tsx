import { FC, useCallback, useEffect, useMemo, useState } from "react";
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
  const [palette, setPalette] = useState<Number[][]>();

  const getImgPalette = useCallback(async () => {
    const res = await getPalette({ imgSrc: testLogin });
    setPalette(res);
  }, []);

  useEffect(() => {
    getImgPalette();
  }, [getImgPalette]);

  const rgbList = useMemo(() => {
    if (palette?.length) {
      return palette.map((item) => `rgb(${item.join(",")})`);
    }
    return [];
  }, [palette]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Row gutter={[8, 8]} style={{ marginBottom: "20px" }}>
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

      <Row gutter={[8, 8]}>
        <Col span={18}>
          <div
            style={{
              height: "500px",
              backgroundImage: `url(${testLogin})`,
              backgroundSize: "100% 100%",
            }}
          ></div>
        </Col>
        <Col span={6}>
          <div>
            {rgbList?.length
              ? rgbList.map((item) => {
                  return (
                    <div
                      style={{
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: item,
                      }}
                    >
                      {item}
                    </div>
                  );
                })
              : null}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
