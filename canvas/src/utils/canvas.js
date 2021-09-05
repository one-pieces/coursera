export function useCanvas(canvas) {
    if (!canvas.getContext) {
      throw new Error('未找到 canvas 实例')
    }
    return canvas.getContext('2d');
}

export function useDrawPoint(ctx, p, isDrawText = true) {
    const circle = new Path2D();
    circle.arc(p.x, p.y, 1, 0, 2 * Math.PI);
    if (isDrawText) {
        ctx.fillText(p.n, p.x, p.y);
    }
    ctx.fill(circle);
}

export function useDrawPath(ctx, hull) {
    const path = new Path2D();
    const p0 = hull.pop()
    path.moveTo(p0.x, p0.y);
    while(!hull.isEmpty()) {
      const p = hull.pop()
      path.lineTo(p.x, p.y);
    }
    path.lineTo(p0.x, p0.y);
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1
    ctx.stroke(path);
}

export function useDrawImage(ctx, src, x = 0, y = 0, width = 400, height = 400) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    return new Promise((resolve) => {
        img.onload = function() {
            ctx.drawImage(img, x, y, width, height);
            resolve(img)
        }
    })
}

// 灰度图
export function useGrayScale(ctx, width = 100, height = 100) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

// 二值图
export function useBinaryImg(ctx, width = 100, height = 100, threshold = 128) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const binary = avg > threshold ? 255 : 0;
        data[i]     = binary; // red
        data[i + 1] = binary; // green
        data[i + 2] = binary; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

// 四值图
export function useMultiLevelImg(ctx, width = 100, height = 100, level = 4) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const MAX_NUMBER = 256
    const threshold = Math.ceil(MAX_NUMBER / level)
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const kind = Math.floor(avg / threshold)
        const value = kind * threshold;
        data[i]     = value; // red
        data[i + 1] = value; // green
        data[i + 2] = value; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

// 特征提取，转化为特征数据
export function useFeatureData(ctx, width = 100, height = 100) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const result = []
    for (let i = 0; i < data.length; i += 4) {
        result.push(data[i])
    }
    return result
}

export function useColorfulArea(ctx, width = 100, height = 100, colorMap) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const color = colorMap[i / 4] || {
            r: 0, g: 0, b: 0,
        }
        data[i]     = color.r; // red
        data[i + 1] = color.g; // green
        data[i + 2] = color.b; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}

// 根据区域信息，自动生成区域内每个点的颜色值 map
export function useColorMap(areas) {
    const map = {}
    Object.keys(areas).forEach(key => {
        const color = rgb()
        const points = areas[key]
        points.forEach(v => {
            map[v] = color
        })
    })
    return map
}

export function useClearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
}

export function rgb() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return {
        r,
        g,
        b,
    }
}