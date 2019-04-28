import Pica from 'pica';
const pica = Pica();

export default class Sheet {
    static heightPx = 3508;
    static widthPx = 2480;
    _sheetItemSize = 0;

    set itemSize(valMM) {
        let px = Sheet.mmToPx(valMM);

        if ((px + (2 * this.horizontalSpace)) > Sheet.widthPx)
            throw new Error('Bigliettino troppo grande, diminuisci la dimensione del bigliettino o lo spazio orizzontale tra un bigliettino e l\'altro');
        else {
            this._sheetItemSize = px;
            this._sheetItemSizeMm = valMM;
        }
    }

    set horizontalSpace(valMM) {
        let px = Sheet.mmToPx(valMM);

        if ((this.itemSize + (2 * px)) > Sheet.widthPx)
            throw new Error('Troppo spazio tra un bigliettino e l\'altro, diminuisci la dimensione del bigliettino o lo spazio orizzontale tra un bigliettino e l\'altro');
        else {
            this._horizontalSpace = px;
            this._horizontalSpaceMm = valMM;       
        }
    }

    set verticalSpace(valMM) {
        let px = Sheet.mmToPx(valMM);

        if (px > Sheet.heightPx)
            throw new Error('Lo spazio verticale tra un bigliettino è troppo grande');
        else {
            this._verticalSpace = px;
            this._verticalSpaceMm = valMM;
        }
    }

    constructor (sheetItemSizeMm, verticalSpaceMm, horizontalSpaceMm) {
        this.itemSize = sheetItemSizeMm;
        this.verticalSpace = verticalSpaceMm;
        this.horizontalSpace = horizontalSpaceMm;
        this._images = [];
    }

    get verticalSpace() {
        return this._verticalSpace;
    }

    get horizontalSpace() {
        return this._horizontalSpace;
    }

    get itemSize() {
        return this._sheetItemSize;
    }

    get verticalSpaceMm() {
        return this._verticalSpaceMm;
    }

    get horizontalSpaceMm() {
        return this._horizontalSpaceMm;
    }

    get itemSizeMm() {
        return this._sheetItemSizeMm;
    }

    static mmToPx(mm) {
        let a4HeightMM = 297;
        let pxPerMM = Sheet.heightPx / a4HeightMM;
        return mm * pxPerMM;
    }

    async getResized(modelImage, sheetItemSize) {
        return new Promise((resolve) => {
            let img = new Image();
            img.onload = async function() {
                let canvas = document.createElement('canvas');
                canvas.width = sheetItemSize;
                canvas.height = (sheetItemSize / img.width) * img.height;
                let resized = await pica.resize(img, canvas);
                resolve(resized);
            };
            img.src = modelImage.base64;
        });
    }

    setImages(images) {
        this._images = images;
    }

    build() {
        let sis = this._sheetItemSize;
        let getResized = this.getResized;
        let horizontalSpacing = this._horizontalSpace;
        let verticalSpacing = this._verticalSpace;
        let images = this._images;

        return new Promise(async (resolve) => {
            let outImages = [];
            
            let a = [];
            for (let i = 0; i < images.length; i++)
                a.push(getResized(images[i], sis));

            // wait for all promises
            let resizedCanvases = await Promise.all(a);
            resizedCanvases = resizedCanvases.sort((a, b) => a.height-b.height);

            // build the image
            let canvasEl = document.createElement('canvas');
            let ctx = canvasEl.getContext('2d');
            ctx.canvas.height = Sheet.heightPx;
            ctx.canvas.width = Sheet.widthPx;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            let x = horizontalSpacing;
            let y = verticalSpacing;
            while (resizedCanvases.length > 0) {
                let consideredElement = resizedCanvases[0];
                let elemHorizontalSpace = (sis + horizontalSpacing);
                let elemVerticalSpace = (consideredElement.height + verticalSpacing);
                let remainingHorizontalSpace = Sheet.widthPx - x;
                let remainingVerticalSpace = Sheet.heightPx - y;

                // check for horizontal space
                if (remainingHorizontalSpace >= elemHorizontalSpace) {
                    // enough horizontal space for the current image
                    // check for horizontal space
                    if (remainingVerticalSpace >= elemHorizontalSpace) {
                        ctx.drawImage(consideredElement, x, y);
                        y += elemVerticalSpace;
                        resizedCanvases.splice(0, 1);
                    } else {
                        // change column
                        x += (sis + horizontalSpacing);
                        y = verticalSpacing;
                    }
                } else {
                    outImages.push(ctx.canvas.toDataURL());
                    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
                    
                    x = horizontalSpacing;
                    y = verticalSpacing;
                }
            }

            outImages.push(ctx.canvas.toDataURL());
            resolve(outImages);
        });
    }
}