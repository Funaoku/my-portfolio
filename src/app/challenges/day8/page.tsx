"use client";

import { useState } from "react";
import MatrixCalculator from "./MatrixCalculator";

export default function Day8() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Day 8: 二次元配列計算機</h1>
      <MatrixCalculator />
    </div>
  );
} 