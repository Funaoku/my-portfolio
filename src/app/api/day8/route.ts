import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(request: Request) {
  try {
    const { matrixA, matrixB, operation } = await request.json();

    const result = await new Promise((resolve, reject) => {
      const pythonProcess = spawn("python3", [
        path.join(process.cwd(), "src/app/challenges/day8/matrixOperations.py"),
        JSON.stringify(matrixA),
        JSON.stringify(matrixB),
        operation,
      ]);

      let result = "";
      let error = "";

      pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}: ${error}`));
          return;
        }

        try {
          const parsedResult = JSON.parse(result);
          if (parsedResult.error) {
            reject(new Error(parsedResult.error));
            return;
          }
          resolve(parsedResult);
        } catch (e) {
          reject(new Error(`Failed to parse Python output: ${e}`));
        }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "計算中にエラーが発生しました" },
      { status: 500 }
    );
  }
} 