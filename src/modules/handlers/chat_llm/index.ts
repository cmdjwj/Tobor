import { Handler } from "../types";
import { chatLlmService } from "./service";

export const chatLlmHandler: Handler = {
    event: "message:text",
    description: '请求大模型API进行回复',
    callback: chatLlmService
}