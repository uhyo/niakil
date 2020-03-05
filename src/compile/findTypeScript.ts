import ts from "typescript";
import resolve from "resolve";

/**
 * Find TypeScript from given path.
 */
export const findTypeScriptFromPath = (basedir: string) => {
  return new Promise<typeof ts>((fulfill, reject) => {
    resolve(
      "typescript",
      {
        basedir,
      },
      (err, resolved) => {
        if (err) {
          reject(err);
        } else {
          fulfill(require(resolved || ""));
        }
      },
    );
  });
};
