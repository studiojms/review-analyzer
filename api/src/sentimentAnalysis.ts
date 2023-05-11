export interface SentimentAnalysis {
  getSentimentAnalysis(text: string, apiKey: string): Promise<SentimentAnalysisResult>;
}

export type SentimentAnalysisResult = {
  sentiment?: string;
};

export abstract class SentimentAnalysisBase implements SentimentAnalysis {
  abstract get apiKey(): string;

  abstract getSentimentAnalysis(text: string | string[]): Promise<SentimentAnalysisResult>;

  async analyzeComments(comments: string[]) {
    const sentimentScores = [];
    for (const comment of comments) {
      const score = await this.getSentimentAnalysis(comment);
      sentimentScores.push(score);
    }
    return sentimentScores;
  }
}
