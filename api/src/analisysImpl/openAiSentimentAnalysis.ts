import { OpenAIApi, Configuration } from 'openai';

import config from '../config';
import { SentimentAnalysisBase, SentimentAnalysisResult } from '../sentimentAnalysis';

export class OpenAiSentimentAnalysis extends SentimentAnalysisBase {
  protected readonly openAiApi: OpenAIApi;

  constructor(readonly model = 'text-davinci-003') {
    super();

    const configuration = new Configuration({
      organization: process.env.openAiOrganizationId ?? '',
      apiKey: this.apiKey,
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  get apiKey(): string {
    return config.OpenAiApiKey;
  }

  async getSentimentAnalysis(text: string | string[]): Promise<SentimentAnalysisResult> {
    const prompt = `This is a sentiment analysis task.\n\nText: ${text}\nSentiment:`;

    const response = await this.openAiApi.createCompletion({
      model: this.model,
      prompt: prompt,
      n: 1,
    });

    return {
      sentiment: response.data.choices[0].text,
    };
  }
}
