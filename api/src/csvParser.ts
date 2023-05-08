import csv from 'csv-parser';
import fs from 'fs';

export interface CSVRow {
  [key: string]: string;
}

export async function parseCSV(filePath: string): Promise<CSVRow[]> {
  const rows: CSVRow[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: CSVRow) => {
        rows.push(data);
      })
      .on('end', () => {
        resolve(rows);
      })
      .on('error', (err: Error) => {
        reject(err);
      });
  });
}
