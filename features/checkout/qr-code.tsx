"use client";

function generateQRGrid(data: string, size = 25): boolean[][] {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }
  const grid: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const addFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const outer = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (row + r < size && col + c < size) grid[row + r][col + c] = outer || inner;
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, size - 7);
  addFinder(size - 7, 0);
  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  let seed = Math.abs(hash);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= size - 8) ||
        (r >= size - 8 && c < 8) ||
        r === 6 ||
        c === 6
      ) {
        continue;
      }
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      grid[r][c] = (seed >>> 0) % 3 !== 0;
    }
  }

  return grid;
}

export function QRCode({
  value,
  size = 200,
  fg = "#000",
  bg = "#fff",
}: {
  value: string;
  size?: number;
  fg?: string;
  bg?: string;
}) {
  const grid = generateQRGrid(value, 25);
  const cellPx = size / 25;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill={bg} />
      {grid.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellPx}
              y={r * cellPx}
              width={cellPx}
              height={cellPx}
              fill={fg}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
