import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export default class GetHash {

  constructor () {
  }

  async fromFile (hashPath) {
    try {
      const fileBuffer = await fs.promises.readFile(path.resolve(hashPath));
      return this._getHash(fileBuffer);
    } catch (e) {
      console.error('There was a problem creating file hash.', e);
      // return something useful anyway
      return this._getFakeHash();
    }
  }

  async fromString (hashString) {
    try {
      return this._getHash(hashString);
    } catch (e) {
      console.error('There was a problem creating string hash.', e);
      // return something useful anyway
      return this._getFakeHash();
    }
  }

  // some random characters
  _getFakeHash (len = 64) {
    return crypto.randomBytes(len).toString('hex');
  }

  _getHash (value) {
    const hashSum = crypto.createHash('sha256');
    hashSum.update(value);
    return hashSum.digest('hex');
  }

};
