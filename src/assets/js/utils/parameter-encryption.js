// 对于界面跳转时进行数据加密处理

import { encrypt, decrypt } from "crypto-js/aes";
import { parse } from "crypto-js/enc-utf8";
import pkcs7 from "crypto-js/pad-pkcs7";
import ECB from "crypto-js/mode-ecb";
import UTF8 from "crypto-js/enc-utf8";

// 注意 key 和 iv 至少都需要 16 位
const AES_KEY = "08090a0b0c0d0e0f";
const AES_IV = "1011121314151617";

export class AesEncryption {
  key;
  iv; // 偏移向量

  constructor(key = AES_KEY, iv = AES_IV) {
    this.key = parse(key);
    this.iv = parse(iv);
  }

  get getOptions() {
    return {
      mode: ECB, // 加密模式
      padding: pkcs7, // 填充方法
      iv: this.iv, // 偏移向量
    };
  }
  // 对对象加密
  encryptByAES(text) {
    return encrypt(text, this.key, this.getOptions).toString();
  }
  // 对对象解密
  decryptByAES(text) {
    return decrypt(text, this.key, this.getOptions).toString(UTF8);
  }
}
