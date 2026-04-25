import { ChatGroq } from "@langchain/groq";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export const msgModel = new ChatGroq({
    model: "openai/gpt-oss-120b",
    maxTokens: undefined, // it means that the model will generate a response with the maximum number of tokens allowed by the model, which is typically around 2048 tokens for GPT-3.5 and 4096 tokens for GPT-4. This allows the model to provide detailed and comprehensive responses without being limited by a token cap.
    maxRetries: 3, // it means that if the model fails to generate a response, it will retry 2 times before giving up. This can help improve reliability in case of transient issues with the API or network.
    apiKey: GROQ_API_KEY,
});

export const chatTitleModel = new ChatGroq({
    model: "llama-3.1-8b-instant",
    maxTokens: 10, // it means that the title will be generated in 10 tokens
    maxRetries: 3,// it means that if the model fails to generate a title, it will retry 2 times before giving up
    apiKey: GROQ_API_KEY,
});
