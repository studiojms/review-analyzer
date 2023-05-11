import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { SentimentAnalysisResult } from '../sentimentAnalysis';
import { OpenAiSentimentAnalysis } from './openAiSentimentAnalysis';

export class ChatGptSentimentAnalysis extends OpenAiSentimentAnalysis {
  async getSentimentAnalysis(text: string | string[]): Promise<SentimentAnalysisResult> {
    const prompt = `This is a sentiment analysis task.\n\nText: ${text}\nSentiment:`;

    const response = await this.openAiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: ChatCompletionRequestMessageRoleEnum.User, content: prompt }],
      n: 1,
    });

    return {
      sentiment: response.data.choices[0].message?.content,
    };
  }
}
