import ts from "typescript";

export class DiagnosticsError {
  constructor(public diagnostic: readonly ts.Diagnostic[]) {}
}
