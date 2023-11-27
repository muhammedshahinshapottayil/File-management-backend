import argon2 from "argon2";
import crypto from "crypto";

export default (password: string) => {
  return new Promise((res, rej) => {
    crypto.randomBytes(32, async (err, buf: any) => {
      res(await argon2.hash(password, buf));
      rej("Error While Hashing");
    });
  }); 
};
