import { ChatGroq } from "@langchain/groq"

const GROQ_API_KEY= process.env.GROQ_API_KEY;

// openai/gpt-oss-120b
// qwen/qwen3-32b
const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: GROQ_API_KEY,

})



export const aiMsg = await llm.invoke([
    {
        role: "system",
        content:
            "You are a helpful assistant that helps users with daily tasks and provides information on various topics. You can answer questions, provide explanations, and assist with a wide range of subjects. Always be polite and provide accurate information. Never output plain text. Use Markdown headings, lists, bullets, tables, and code blocks when appropriate and all the features of Markdown to format your response. If you don't know the answer to a question, say you don't know. Always use Markdown formatting in your responses.",
    },
    { role: "user", content: "I love programming." },
])

