import { CSVRow, parseCSV } from './csvParser';
import { MonkeyLearnSentimentAnalysis } from './monkeyLearnSentimentAnalysis';

async function main() {
  try {
    const rows: CSVRow[] = await parseCSV('data/JS Review - us - B0BHC395WW_05_05_2023.csv');

    const reviews = rows.map((row) => row['Body'].replace(/\n/g, ' ').trim()).filter((review) => review.length > 0);

    console.log('=== Reviews ===');
    console.log(reviews);
    console.log('=================================');

    for (const review of reviews.slice(0, 5)) {
      const analysis = await new MonkeyLearnSentimentAnalysis().getSentimentAnalysis(review);
      console.log('Review: ', review);
      console.log('Analysis: ', analysis);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
