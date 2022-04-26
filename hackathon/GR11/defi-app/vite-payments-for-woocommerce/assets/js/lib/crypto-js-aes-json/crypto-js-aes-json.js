import * as CryptoJS from 'https://unpkg.com/crypto-js';

var CryptoJSAesJson =
{
    //var encrypted = CryptoJS.AES.encrypt(JSON.stringify("value to encrypt"), "my passphrase", {format: CryptoJSAesJson}).toString();
    stringify: function (cipherParams)
    {
        var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    //var decrypted = JSON.parse(CryptoJS.AES.decrypt(encrypted, "my passphrase", {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
    parse: function (jsonStr)
    {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
    }
}

/**
 * Encrypt a value to cryptojs compatiable json encoded string
 * ex. var encrypted = cryptoJsAesEncrypt("passphrase", stringToEncrypt)
 * 
 * @param mixed $passphrase
 * @param mixed $value
 * @return string
 */
async function cryptoJsAesEncrypt(passphrase, jsonString)
{
    return CryptoJS.AES.encrypt(JSON.stringify(jsonString), passphrase, {format: CryptoJSAesJson}).toString();
}

/**
 * Decrypt data from a CryptoJS json encoded string
 * ex. var decrypted = cryptoJsAesDecrypt("passphrase", stringToDecrypt);
 *
 * @param mixed $passphrase
 * @param mixed $jsonString
 * @return mixed
 */
async function cryptoJsAesDecrypt(passphrase, jsonString)
{
    return JSON.parse(CryptoJS.AES.decrypt(jsonString, passphrase, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
}