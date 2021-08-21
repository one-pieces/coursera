export function useCanvas(canvas) {
    if (!canvas.getContext) {
      throw new Error('未找到 canvas 实例')
    }
    return canvas.getContext('2d');
}

export function useDrawPoint(ctx, p) {
    const circle = new Path2D();
    circle.arc(p.x, p.y, 1, 0, 2 * Math.PI);
    ctx.fillText(p.n, p.x, p.y);
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
    ctx.strokeStyle = 'green'
    ctx.stroke(path);
}

export function useDrawImage(ctx, src) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    return new Promise((resolve) => {
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            resolve(img)
        }
    })
}

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

export function useSingleData(ctx, width = 100, height = 100) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const result = []
    console.log('=====', imageData, data.length)
    for (let i = 0; i < data.length; i += 4) {
        result.push(data[i] === 255 ? 1 : 0)
    }
    console.log(result)
    return result
}

export function useColorfulArea(ctx, width = 100, height = 100, quickUnion) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const areas = quickUnion.findAll(20)
    const roots = Object.keys(areas)
    console.log('=========ppp', roots)
    for (let i = 0; i < data.length; i += 4) {
        const _i = Math.floor(i / 4)
        let root = quickUnion.root(_i)
        root = roots.includes(`${root}`) ? root : 0
        data[i]     = root / 255; // red
        data[i + 1] = root % 255; // green
        data[i + 2] = root; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}