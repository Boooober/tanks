export class ObjectRendererHelperService {
    static scaleImage(context, image, targetWidth, targetHeight, iterations = 8) {
        const originalWidth = image.width;
        const originalHeight = image.height;
        const dWidth = (originalWidth - targetWidth) / iterations;
        const dHeight = (originalHeight - targetHeight) / iterations;

        /** TODO is it safe to create elements in Angular service in such way?! */
        const virtualCanvas = document.createElement('canvas');
        const virtualContext = virtualCanvas.getContext('2d');

        let scaledWidth = originalWidth - dWidth;
        let scaledHeight = originalHeight - dHeight;

        virtualCanvas.width = (originalWidth < targetWidth ? targetWidth : originalWidth) * iterations;
        virtualCanvas.height = scaledHeight < targetHeight ? targetHeight : scaledHeight;

        virtualContext.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        let slideOffset = 0;
        for (let i = 1; i < iterations; i++) {
            virtualContext.drawImage(virtualCanvas, slideOffset,                          0, scaledWidth,          scaledHeight,
                                                    slideOffset + (scaledWidth - dWidth), 0, scaledWidth - dWidth, scaledHeight - dHeight);
            scaledWidth -= dWidth;
            scaledHeight -= dHeight;
            slideOffset += scaledWidth;
        }
        context.drawImage(virtualCanvas, slideOffset,      0,                 targetWidth, targetHeight,
                                         -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

    }
}
// context.drawImage(img, -object.width / 2, -object.height / 2);

