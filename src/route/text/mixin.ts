import { inputEditor, outputEditor } from "."
import { Editor } from "./editor"

export class TextUtil {
    /** Base64 编码 */
    public static base64Encode = (str: string) => {
        try {
            const encoder = new TextEncoder()
            const nums: number[] = []
            encoder.encode(str).forEach(i => nums.push(i))
            return btoa(String.fromCharCode(...nums))
        } catch (error: any) {
            return `Base64 编码失败：${error.message}`
        }
    }

    /** Base64 解码 */
    public static base64Decode = (str: string) => {
        try {
            const decodedString = atob(str)
            const decoder = new TextDecoder()
            const uint8Array = new Uint8Array(decodedString.length)
            for (let i = 0; i < decodedString.length; i++)
                uint8Array[i] = decodedString.charCodeAt(i)
            return decoder.decode(uint8Array)
        } catch (error: any) {
            return `Base64 解码失败：${error.message}`
        }
    }

    /** 去除每行首尾空白 */
    public static trimPerLine = (str: string) => {
        return str.split('\n').map(line => line.trim()).join('\n')
    }
}

/** 交换编辑框内容 */
export const exchangeInput = () => {
    const inputStr = inputEditor.getText()
    const outputStr = outputEditor.getText()
    if (inputStr != outputStr) {
        inputEditor.setText(outputStr)
        outputEditor.setText(inputStr)
    }
}