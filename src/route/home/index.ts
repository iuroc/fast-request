import { Route } from 'vanjs-router'
import van from 'vanjs-core'
import { Card } from './view'

const { div } = van.tags

export default () => Route({ name: 'home', class: 'container py-4' },
    div({ class: 'row gy-4' },
        Card('发送请求', '快捷构建和发送 HTTP 请求', 'api'),
        Card('文本工具', '格式化、编解码、加解密', 'text'),
    )
)