// eslint-disable-next-line import/no-anonymous-default-export
export default (src:string) => {

  // 根据颜色偏向返回黑色或者白色
  const getContrastYIQ = (r: number, g: number, b: number) => {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // 以中性灰（即值为128）为判断，高于128则认为图片偏白，则以黑色显示文字，反之则为白色显示文字
    return yiq >= 128 ? 'black' : 'white';
  };

  return new Promise((resolve,reject) => {
    const myCanvas = document.createElement('canvas')
    const myImg = document.createElement('img')
    myImg.src = src
    myCanvas.style.display="none"

    document.body.appendChild(myCanvas)

    myImg.addEventListener('error',(error) => {
      reject(error)
    })
    myCanvas.addEventListener('error',(error) => {
      reject(error)
    })
    myCanvas.addEventListener('load', () => {
      const cWidth = 300;
      const cHeight = 300;
      myCanvas.width = cWidth;
      myCanvas.height = cHeight;
      const imgHeight = myImg.height;
      const imgWidth = myImg.width;
      const context = myCanvas.getContext('2d');
      if (context) {
        // 在canvas中绘制要计算的图片部分，属性具体含义看官网
        context.drawImage(myImg, imgWidth * 0.3, imgHeight * 0.8, imgWidth * 0.4, imgHeight * 0.2, 0, 0, cWidth, cHeight);
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

        resolve(getContrastYIQ(r, g, b))
      } else {
        reject('canvas绘制失败')
      }
    });

  })
}