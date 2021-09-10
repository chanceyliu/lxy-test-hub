import { useCallback, useEffect, useRef, useState } from "react";

// 根据颜色偏向返回黑色或者白色
function getContrastYIQ(r: number, g: number, b: number) {
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // 以中性灰（即值为128）为判断，高于128则认为图片偏白，则以黑色显示文字，反之则为白色显示文字
  return yiq >= 128 ? "black" : "white";
}

/**
 * 不知道图片具体宽度下，根据图片比例截取
 */
interface IProps {
  /**
   * 要对比的图片地址
   */
  img: string;
  /**
   * 截取点的x轴距离，取与图片宽度的比例系数，默认0
   */
  xMultiple?: number;
  /**
   * 截取点的y轴距离，取与图片高度的比例系数，默认0
   */
  yMultiple?: number;
  /**
   * 要截取的比例（以图片宽度为准），默认1
   */
  wMultiple?: number;
  /**
   * 要截取的比例（以图片高度为准），默认1
   */
  hMultiple?: number;
}

const Index = ({
  img: src,
  xMultiple = 0,
  yMultiple = 0,
  wMultiple = 1,
  hMultiple = 1,
}: IProps) => {
  const [imgColor, setImgColor] = useState<"black" | "white">("black");
  const myCanvas = useRef<HTMLCanvasElement>();
  const bgImg = useRef<HTMLImageElement>();

  const initCanvas = useCallback(() => {
    myCanvas.current = document.createElement("canvas");
    bgImg.current = document.createElement("img");
    bgImg.current.src = src;

    // 给canvas标签一个宽高
    const cWidth = 300;
    const cHeight = 300;
    const iHeight = bgImg.current.height;
    const iWidth = bgImg.current.width;
    const imgSize = cWidth * cHeight;

    myCanvas.current.width = cWidth;
    myCanvas.current.height = cHeight;

    const ctx = myCanvas.current.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        bgImg.current,
        iWidth * xMultiple,
        iHeight * yMultiple,
        iWidth * wMultiple,
        iHeight * hMultiple,
        0,
        0,
        cWidth,
        cHeight
      );

      document.body.appendChild(myCanvas.current);

      // 获取canvas中图像的像素数据
      const data = ctx.getImageData(0, 0, 300, 300).data;
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

      // 求取平均值
      r = Math.round(r / imgSize);
      g = Math.round(g / imgSize);
      b = Math.round(b / imgSize);

      const res = getContrastYIQ(r, g, b);
      setImgColor(res);
    }
  }, [hMultiple, src, wMultiple, xMultiple, yMultiple]);

  useEffect(() => {
    window.addEventListener("load", () => {
      initCanvas();
    });
    return () => {
      myCanvas.current = undefined;
      bgImg.current = undefined;
    };
  }, [initCanvas]);

  return {
    theme: imgColor,
  };
};

export default Index;
