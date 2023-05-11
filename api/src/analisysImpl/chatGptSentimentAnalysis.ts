import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { SentimentAnalysisResult } from '../sentimentAnalysis.ts'
import OpenAiSentimentAnalysis from './openAiSentimentAnalysis.ts'

export default class ChatGptSentimentAnalysis extends OpenAiSentimentAnalysis {


  async getSentimentAnalysis(text: string | string[]): Promise<SentimentAnalysisResult> {
    // Here are the prompts that I am using for the first API calls (focused on key themes)
    const prompt_adjusted = 'Analyze the 4-5 star Amazon reviews of this product and identify key insights that contribute to its success. Here is the data:'
    const system_message_adjusted = 'You have a dataset containing 4-5 star reviews of a product sold on Amazon, focusing on customer experiences in the United States. Analyze the dataset to extract core insights that can help users understand why their competitors products are successful. Keep your response below 200 tokens.'
    const user_message_adjusted = 'Please provide 3 key insights from the review data that contribute to the products success.'
    // const prompt = `This is a sentiment analysis task.\n\nText: ${text}\nSentiment:`
    // prompt = `${prompt_adjusted}\n{df_string}`

    const response = await this.openAiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
            content: system_message_adjusted,
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: user_message_adjusted,
        }
      ],}
    )

    return {
      sentiment: response.data.choices[0].message?.content,
    }
  }

  async getSentimentAnalysis2(text: string | string[][]): Promise<SentimentAnalysisResult> {
    // Here are the prompts that I am using for the first API calls (focused on key themes)
    const prompt_adjusted = 'Analyze the 1-5 star Amazon reviews of this product and identify key insights that contribute to its success. Here is the data:'
    // const system_message_adjusted = 'You have a dataset containing the review date, review rating 1-5 star reviews of a product sold on Amazon, we also send review verified purchase which we want it to be weighted in the reponse, higher is better. We also want the review date to be weighted in the response, more recent is better,  focusing on customer experiences in the United States. Analyze the dataset to extract core insights that can help users understand why their competitors products are successful. Keep your response below 200 tokens.'
    const system_message_adjusted = `You have a dataset containing the review date, 1-5 star reviews, 
    review title, review body and the count of people who found the review helpful, 
    of a product sold on Amazon, focusing on customer experiences in the United States.
    Your task is to analyze the dataset to extract core insights that can help users understand why their competitors products are successful.
    On your analysis give a bigger weight to more recent reviews as well as the reviews that people find the most helpful. 
    Keep your response below 200 tokens.`
    const user_message_adjusted = `${prompt_adjusted}Please provide 3 key insights from the review data that contribute to the products success.`
    // const prompt = `This is a sentiment analysis task.\n\nText: ${text}\nSentiment:`
    // prompt = `${prompt_adjusted}\n{df_string}`

    console.log('text', text)

    const response = await this.openAiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: system_message_adjusted,
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: `${user_message_adjusted}. this is the input data: ${text}`,
        }
      ],}
    )

    return {
      sentiment: response.data.choices[0].message?.content,
    }
  }
}


/*
1. High-quality product: Many reviews mention the high quality of the product, from the materials used to the overall design. This suggests that customers are willing to pay a premium for a quality product.

2. Customer service: Several reviews highlight the company's excellent customer service, in terms of responsiveness and problem-solving. This shows that customers value a positive experience beyond just the product itself.

3. User-friendly experience: Many reviews praise the ease of use and intuitive design of the product, suggesting that customers highly value products that are user-friendly and accessible to all.

 */
