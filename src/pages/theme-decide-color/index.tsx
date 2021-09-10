import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import defaultBackground from "../../assets/default-background.png";
import defaultLoginBg from "../../assets/default-login-bg.png";

// 根据颜色偏向返回黑色或者白色
function getContrastYIQ(r: number, g: number, b: number) {
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // 以中性灰（即值为128）为判断，高于128则认为图片偏白，则以黑色显示文字，反之则为白色显示文字
  return yiq >= 128 ? "black" : "white";
}

function getContrastYIQ1(color: string) {
  const data = color.split(",");
  const r = Number(data[0]);
  const g = Number(data[1]);
  const b = Number(data[2]);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // 以中性灰（即值为128）为判断，高于128则认为图片偏白，则以黑色显示文字，反之则为白色显示文字
  return yiq >= 128 ? "black" : "white";
}

// 16进制转rgb
function toRgb(hexcolor: string) {
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);
  return [r, g, b];
}

const colorArr = [
  {
    color: "rgb(255,0,255)",
    value: "255,0,255",
  },
  {
    color: "rgb(255,255,0)",
    value: "255,255,0",
  },
  {
    color: "rgb(255,0,0)",
    value: "255,0,0",
  },
  {
    color: "rgb(2,255,0)",
    value: "2,255,0",
  },
  {
    color: "rgb(0,65,255)",
    value: "0,65,255",
  },
  {
    color: "rgb(255,213,0)",
    value: "255,213,0",
  },
  {
    color: "rgb(255,0,175)",
    value: "255,0,175",
  },
];

const Index: FC = () => {
  const [imgColor, setImgColor] = useState<number[]>();
  const [colorTheme, setColorTheme] = useState<string>();
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const bgImg = useRef<HTMLImageElement>(null);

  // 根据背景图片计算互补色
  const contrast = useMemo(() => {
    if (imgColor?.length) {
      const data = imgColor?.map((item) => Math.abs(255 - item));
      return `rgb(${data?.join()})`;
    }
    return "rgb(0,0,0)";
  }, [imgColor]);

  const getImgTheme = useCallback((canvas) => {
    const cWidth = 300;
    const cHeight = 300;
    canvas.width = cWidth;
    canvas.height = cHeight;
    const context = canvas.getContext("2d");
    const imgHeight = bgImg.current?.height as number;
    const imgWidth = bgImg.current?.width as number;
    debugger;

    // 在canvas中绘制要计算的图片部分，属性具体含义看官网
    context.drawImage(
      bgImg.current,
      imgWidth * 0.3,
      imgHeight * 0.8,
      imgWidth * 0.4,
      imgHeight * 0.2,
      0,
      0,
      cWidth,
      cHeight
    );

    // 获取canvas中图像的像素数据
    const data = context.getImageData(0, 0, 300, 300).data;
    let r = 0;
    let g = 0;
    let b = 0;

    // 取所有像素的平均值
    for (let row = 0; row < cHeight; row++) {
      for (let col = 0; col < cWidth; col++) {
        r += data[(cWidth * row + col) * 4];
        g += data[(cWidth * row + col) * 4 + 1];
        b += data[(cWidth * row + col) * 4 + 2];
      }
    }
    const imgSize = cWidth * cHeight;
    // 求取平均值
    r = Math.round(r / imgSize);
    g = Math.round(g / imgSize);
    b = Math.round(b / imgSize);
    setImgColor([r, g, b]);
    setColorTheme(getContrastYIQ(r, g, b));
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      getImgTheme(myCanvas.current);
    });
  }, [getImgTheme]);

  return (
    <div>
      <span>1</span>
      <div
        style={{
          backgroundImage: `url(${defaultLoginBg})`,
          width: "300px",
          height: "300px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <span style={{ color: colorTheme }}>版权信息奥力给</span>
      </div>
      <img
        alt="图片"
        src={defaultLoginBg}
        ref={bgImg}
        style={{ display: "none" }}
      />
      <canvas ref={myCanvas} style={{ display: "none" }}></canvas>
      {colorArr.map((item) => (
        <div
          key={item.value}
          style={{
            backgroundColor: item.color,
            width: "200px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ color: getContrastYIQ1(item.value) }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Index;
