import { CSVRow, parseCSV } from './csvParser.ts'
import MonkeyLearnSentimentAnalysis from './analisysImpl/monkeyLearnSentimentAnalysis.ts'
import ChatGptSentimentAnalysis from './analisysImpl/chatGptSentimentAnalysis.ts'
import OpenAiSentimentAnalysis from './analisysImpl/openAiSentimentAnalysis.ts'

enum SentimentAnalysisType {
  OpenAi = 'openai',
  ChatGpt = 'chatgpt',
  MonkeyLearn = 'monkeylearn',
}

function sentimentAnalysisStrategy(type: SentimentAnalysisType) {
  switch (type) {
    case SentimentAnalysisType.OpenAi:
      return new OpenAiSentimentAnalysis()
    case SentimentAnalysisType.ChatGpt:
      return new ChatGptSentimentAnalysis()
    case SentimentAnalysisType.MonkeyLearn:
      return new MonkeyLearnSentimentAnalysis()
    default:
      throw new Error('Invalid sentiment analysis type')
  }
}

async function main() {
  try {
    const rows: CSVRow[] = await parseCSV('data/JS Review - us - B0BHC395WW_05_05_2023.csv')

    const reviews = rows.map((row) => row.Body.replace(/\n/g, ' ').trim()).filter((review) => review.length > 0)

    console.log('=== Reviews ===')
    console.log(reviews)
    console.log('=================================')

    const analysisProcessor = sentimentAnalysisStrategy(SentimentAnalysisType.ChatGpt)

    for (const review of reviews.slice(0, 5)) {
      const analysis = await analysisProcessor.getSentimentAnalysis(review)
      console.log('Review: ', review)
      console.log('Analysis: ', analysis.sentiment)
    }
  } catch (err) {
    console.error(err)
  }
}

main().then(() => console.log('Analysis done'))
