import { Context } from "grammy";
import { getEnvConfig } from "../../../config";
import { OpenAI } from "openai";

// TODO: R1 思考过程；markdown 格式支持；历史记录；系统 prompt；未发送完时消息被删除

async function makeStreamingRequest(client: OpenAI, message: string) {
    return await client.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V3", // 或 "deepseek-ai/DeepSeek-R1" 
        messages: [
            { role: "user", content: message }
        ],
        temperature: 0.7,
        stream: true
    });
}

async function handleStreamingResponse(
    ctx: Context,
    initialMessage: { message_id: number },
    completion: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>
) {
    const editMessage = async (responseText: string) => {
        try {
            await ctx.api.editMessageText(ctx.chat!.id, initialMessage.message_id, responseText);
        } catch (error) {
            if (error instanceof Error && (
                error.message.includes('message is not modified') ||
                error.message.includes('message to edit not found')
            )) return;
            return Promise.reject(error);
        }
    };
    let responseText = "";
    let lastEditTime = 0;
    const MIN_EDIT_INTERVAL = 500;
    for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
            responseText += content;
            const now = Date.now();
            if (now - lastEditTime >= MIN_EDIT_INTERVAL) {
                editMessage(responseText);
                lastEditTime = now;
            }
        }
    }
    if (responseText) await editMessage(responseText);
    return responseText;
}

export async function chatLlmService(ctx: Context): Promise<void> {
    if (!ctx.chat) return Promise.reject(new Error('无法获取聊天信息'));
    if (!ctx.message?.text) return Promise.reject(new Error("无法获取文本消息"));
    const config = getEnvConfig();
    if (!config.silicon_api_key) {
        await ctx.reply("未配置 Silicon API Key");
        return;
    }
    const client = new OpenAI({
        apiKey: config.silicon_api_key,
        baseURL: config.silicon_api_base_url
    });
    try {
        const completion = await makeStreamingRequest(client, ctx.message.text);
        const initialMessage = await ctx.reply("…");
        await ctx.replyWithChatAction("typing");
        await handleStreamingResponse(ctx, initialMessage, completion);
    } catch (error) {
        console.error("调用 API 出错:", error);
        return Promise.reject(error);
    }
}
