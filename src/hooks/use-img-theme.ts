import { useCallback, useEffect, useRef, useState } from "react";

// 根据颜色偏向返回黑色或者白色
function getContrastYIQ(r: number, g: number, b: number) {
  // w3c上提供的计算颜色明亮度的算法
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // 以中性灰（即值为128）为判断，高于128则认为图片偏白，则以黑色显示文字，反之则为白色显示文字
  return yiq >= 128 ? "black" : "white";
}

/**
 * 根据图片比例截取
 */
interface IProps {
  /**
   * 要对比的图片地址，为false则直接返回
   */
  img: string | false;
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
  img,
  xMultiple = 0,
  yMultiple = 0,
  wMultiple = 1,
  hMultiple = 1,
}: IProps) => {
  const [imgColor, setImgColor] = useState<"black" | "white">("black");
  const myCanvas = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const bgImg = useRef<HTMLImageElement>(document.createElement("img"));

  const initCanvas = useCallback(() => {
    bgImg.current.src = img as string;
    bgImg.current.addEventListener("load", () => {
      const iHeight = bgImg.current.height;
      const iWidth = bgImg.current.width;
      const canvasWidth = iWidth * wMultiple;
      const canvasHeight = iHeight * hMultiple;
      const canvasSize = canvasWidth * canvasHeight;

      myCanvas.current.width = canvasWidth;
      myCanvas.current.height = canvasHeight;

      const ctx = myCanvas.current!.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          bgImg.current,
          iWidth * xMultiple,
          iHeight * yMultiple,
          canvasWidth,
          canvasHeight,
          0,
          0,
          canvasWidth,
          canvasHeight
        );

        // 获取canvas中图像的像素数据
        const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
        let r = 0;
        let g = 0;
        let b = 0;

        // 取所有像素的平均值
        for (let col = 0; col < canvasWidth; col++) {
          for (let row = 0; row < canvasHeight; row++) {
            r += data[canvasWidth * row + col * 4];
            g += data[canvasWidth * row + col * 4 + 1];
            b += data[canvasWidth * row + col * 4 + 2];
          }
        }

        // 求取平均值
        r = Math.round(r / canvasSize);
        g = Math.round(g / canvasSize);
        b = Math.round(b / canvasSize);
        console.log(r, g, b);

        const res = getContrastYIQ(r, g, b);
        setImgColor(res);
      }
    });
  }, [hMultiple, wMultiple, xMultiple, yMultiple, img]);

  useEffect(() => {
    if (typeof img === "string") {
      initCanvas();
    }
  }, [initCanvas, img]);

  return {
    theme: imgColor,
  };
};

export default Index;
