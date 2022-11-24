/**
 * 通用工具类
 */
export default class func {
  /**
   * 不为空
   * @param val
   * @returns {boolean}
   */
  static notEmpty(val) {
    return !this.isEmpty(val);
  }

  /**
   * 是否为定义
   * @param val
   * @returns {boolean}
   */
  static isUndefined(val) {
    return val === null || typeof val === 'undefined';
  }

  /**
   * 为空
   * @param val
   * @returns {boolean}
   */
  static isEmpty(val) {
    if (
      val === null ||
      typeof val === 'undefined' ||
      (typeof val === 'string' && val === '' && val !== 'undefined')
    ) {
      return true;
    }
    return false;
  }

  /**
   * 强转int型
   * @param val
   * @param defaultValue
   * @returns {number}
   */
  static toInt(val, defaultValue) {
    if (this.isEmpty(val)) {
      return defaultValue === undefined ? -1 : defaultValue;
    }
    const num = parseInt(val, 0);
    return Number.isNaN(num) ? (defaultValue === undefined ? -1 : defaultValue) : num;
  }

  /**
   * Json强转为Form类型
   * @param obj
   * @returns {FormData}
   */
  static toFormData(obj) {
    const data = new FormData();
    Object.keys(obj).forEach(key => {
      data.append(key, Array.isArray(obj[key]) ? obj[key].join(',') : obj[key]);
    });
    return data;
  }

  /**
   * date类转为字符串格式
   * @param date
   * @param format
   * @returns {null}
   */
  static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date ? date.format(format) : null;
  }

  /**
   * 根据逗号联合
   * @param arr
   * @returns {string}
   */
  static join(arr) {
    return arr ? arr.join(',') : '';
  }

  /**
   * 根据逗号分隔
   * @param str
   * @returns {string}
   */
  static split(str) {
    return str ? String(str).split(',') : '';
  }

  /**
   * 下载文件
   * @param res 请求返回的res
   */
  static downLoadFile(res, customFilename) {
    let filename = null, disposition = null, blob = null;
    // 兼容 GenericController 中的下载
    if (Blob.prototype.isPrototypeOf(res)) {
      disposition = res["$headers$"]["content-disposition"];
      blob = new Blob([res]);
    } else {
      disposition = res.headers["content-disposition"];
      blob = new Blob([res.data]);
    }
    // 兼容 GenericController 中的下载
    if (disposition && disposition.indexOf("filename*=") != -1) {
      filename = disposition.substring(disposition.indexOf("''") + 2);
    } else {
      filename = disposition.substring(disposition.indexOf("=") + 1);
    }
    filename = decodeURIComponent(filename, "utf-8");

    if (customFilename) {
      filename = customFilename + filename.substring(filename.lastIndexOf("."));
    }

    if (typeof window.chrome !== 'undefined') {
      // Chrome
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE
      window.navigator.msSaveBlob(new Blob([blob], { type: 'application/force-download' }), filename);
    } else {
      // Firefox
      var file = new File([blob], filename, { type: 'application/force-download' });
      window.open(URL.createObjectURL(file));
    }
  }

}
