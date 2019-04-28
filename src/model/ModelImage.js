import { v4 as uuid } from "uuid";

export default class ModelImage {
    _imgFile = undefined;
    _imgBase64 = undefined;
    _id = undefined;

    constructor() {
        this._id = uuid();
    }

    set base64 (val) {
        this._imgBase64 = val;
    }

    set file(f) {
        this._imgFile = f;
        this.base64 = f.src;
    }

    get base64() {
        return this._imgBase64;
    }

    get id() {
        return this._id;
    }
}