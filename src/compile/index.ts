import path from "path";
import ts from "typescript";
import { getProgramFromProject } from "./getProgramFromProject";
import { findTypeScriptFromPath } from "./findTypeScript";

type Options = {
  projectPath: string;
  ts?: typeof ts;
};

export const compileProject = async ({ projectPath, ts: tsParam }: Options) => {
  const projectDir = path.dirname(projectPath);

  const ts = tsParam || (await findTypeScriptFromPath(projectDir));
  const program = await getProgramFromProject({
    projectPath,
    ts,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  console.log(diagnostics);
};
