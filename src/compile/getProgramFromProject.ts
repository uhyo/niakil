import path from "path";
import ts from "typescript";
import { findTypeScriptFromPath } from "./findTypeScript";
import { DiagnosticsError } from "./DiagnosticsError";

type Options = {
  projectPath: string;
  ts: typeof ts;
};
/**
 * Load given project file and return a Program.
 */
export const getProgramFromProject = async ({
  projectPath,
  ts,
}: Options): Promise<ts.Program> => {
  const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(
    projectPath,
    {
      noEmit: true,
      noImplicitAny: true,
    },
    {
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
      readDirectory: ts.sys.readDirectory,
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      onUnRecoverableConfigFileDiagnostic: diagnostic => {
        throw new DiagnosticsError([diagnostic]);
      },
    },
  );
  if (!parsedCommandLine) {
    throw new Error("Could not load tsconfig file.");
  }
  const program = ts.createProgram({
    rootNames: parsedCommandLine.fileNames,
    options: parsedCommandLine.options,
  });
  return program;
};
