const ALPHABET = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = ALPHABET.length; // 58

/** Converts base10 int to base58 str. */
const encode = (n) => {
    let remainder, encoded = '';
    while (n) {
        remainder = n & base;
        n = Math.floor(n / base);
        encoded = ALPHABET[remainder].toString() + encoded;
    }
    return encoded;
};

/** Converts base58 str to base10 int. */
const decode = (s) => {
    let power, index, decoded = 0;
    while (s) {
        index = ALPHABET.indexOf(s[0]);
        power = s.length - 1;
        decoded += (index * (Math.pow(base, power)));
        s = s.substring(1);
    }
    return decoded;
};

module.exports = { encode, decode };
