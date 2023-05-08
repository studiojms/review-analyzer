import axios from 'axios';

import { SentimentAnalysisBase } from './sentimentAnalysis';
import config from './config';

export class MonkeyLearnSentimentAnalysis extends SentimentAnalysisBase {
  constructor(readonly modelId = 'cl_pi3C7JiL') {
    super();
    this.modelId = modelId;
  }

  get apiKey(): string {
    return config.MonkeyLearnApiKey;
  }

  async getSentimentAnalysis(text: string | string[]) {
    const url = `https://api.monkeylearn.com/v3/classifiers/${this.modelId}/classify/`;
    const data = {
      data: Array.isArray(text) ? text : [text],
    };

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.apiKey}`,
      },
    });
    const result = await response.data;
    return result[0].classifications[0].tag_name;
  }
}
