import van from 'vanjs-core'
import { setupEditor } from './editor'

const { div } = van.tags

export const makeEditor = () => {
    const ele = div({ class: 'text-editor border border-3 rounded-3 overflow-hidden mb-3' })
    const view = setupEditor(ele)
    return { ele, view }
}