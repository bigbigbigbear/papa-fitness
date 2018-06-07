/**
 * @author bear 18/05/01
 * @desc 公共方法库
 */
function b64ToUint6(nChr) {
  // convert base64 encoded character to 6-bit integer
  // from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
      ? nChr - 71
      : nChr > 47 && nChr < 58
        ? nChr + 4
        : nChr === 43
          ? 62
          : nChr === 47
            ? 63
            : 0
}
/**
 * 把base64转化为blob对象，便于使用fromdata上传图片
 */
export function dataURItoBlob(dataURI, image_fmt) {
  var byteString = atob(dataURI.split(',')[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], {
    type: 'image/' + image_fmt
  })
}

/**
 * 把base64转化为blob对象，便于使用fromdata上传图片，方法同上dataURItoBlob，此为webcam.js里扒出来的https://github.com/jhuckaby/webcamjs/blob/master/webcam.js
 */
export function base64DecToArr(sBase64, image_fmt, nBlocksSize) {
  // convert base64 encoded string to Uintarray
  // from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
  sBase64 = sBase64.split(',')[1]
  var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, '')
  var nInLen = sB64Enc.length
  var nOutLen = nBlocksSize
    ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlocksSize) * nBlocksSize
    : (nInLen * 3 + 1) >> 2
  var taBytes = new Uint8Array(nOutLen)

  for (
    var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
    nInIdx < nInLen;
    nInIdx++
  ) {
    nMod4 = nInIdx & 3
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (18 - 6 * nMod4)
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255
      }
      nUint24 = 0
    }
  }
  return new Blob([taBytes], {
    type: 'image/' + image_fmt
  })
}
