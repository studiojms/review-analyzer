import * as dotenv from 'dotenv';

dotenv.config();

export default {
  MonkeyLearnApiKey: process.env.MONKEYLEARN_API_KEY ?? '',
};
