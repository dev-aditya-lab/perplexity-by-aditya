import { HumanMessage, SystemMessage,AIMessage } from "@langchain/core/messages";
import { msgModel, chatTitleModel } from "./ai.models.js";
import { chatTitleModelSystemMessage, messageModelSystemMessage } from "./ai.systemMessage.js";



export async function sendMessageToAI(Allmessages) {
    const response = await msgModel.invoke([
        new SystemMessage(messageModelSystemMessage),
        ...Allmessages.map(msg => {
            if (msg.role === "user") {
                return new HumanMessage(msg.content);
            } else {
                return new AIMessage(msg.content);
            }
        })
    ]);

    return response.text;
}


export async function generateChatTitle(message) {
    const reponese = await chatTitleModel.invoke([
        new SystemMessage(chatTitleModelSystemMessage),
        new HumanMessage(
            `Generate a title for a chat conversation based on the following first message: "${message}". The title should be concise, descriptive, and relevant to the content of the message.`
        ),
    ]);
    return reponese.text;
}