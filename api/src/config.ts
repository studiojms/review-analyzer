import * as dotenv from 'dotenv';

dotenv.config();

export default {
  MonkeyLearnApiKey: process.env.MONKEYLEARN_API_KEY ?? '',
  OpenAiApiKey: process.env.OPENAI_API_KEY ?? '',
  OpenAIOrganizationId: process.env.OPENAI_ORGANIZATION_ID ?? '',
};
