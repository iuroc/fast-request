export const base64Encode = (str: string) => {
    try {
        const encoder = new TextEncoder()
        const nums: number[] = []
        encoder.encode(str).forEach(i => nums.push(i))
        return btoa(String.fromCharCode(...nums))
    } catch (error: any) {
        return `Base64 编码失败：${error.message}`
    }
}

export const base64Decode = (str: string) => {
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