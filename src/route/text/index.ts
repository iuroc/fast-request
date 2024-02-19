import van from 'vanjs-core'
import { Route } from 'vanjs-router'
import { Dropdown } from 'bootstrap'
import { makeEditor } from './mixin'
import { base64Decode, base64Encode } from '../../util'
import { getText, setText } from './editor'

const { button, div, hr } = van.tags

export const { ele: inputEle, view: inputView } = makeEditor()
export const { ele: outputEle, view: outputView } = makeEditor()

export default () => {
    const dropBtn = button({
        class: 'btn btn-success dropdown-toggle',
        'data-bs-toggle': 'dropdown',
    }, '文本操作')

    return Route({
        name: 'text', class: 'container py-4', onFirst() {
            new Dropdown(dropBtn)
        }
    },
        div({ class: 'hstack mb-3' },
            div({ class: 'fs-4 me-auto' }, '文本工具'),
            div({ class: 'btn-group' },
                button({
                    class: 'btn btn-danger', onclick() {
                        setText(inputView, '')
                        setText(outputView, '')
                    }
                }, '清空'),
                dropBtn,
                div({ class: 'dropdown-menu dropdown-menu-end shadow overflow-auto', style: 'max-height: 600px;' },
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            setText(outputView, base64Encode(getText(inputView)))
                        }
                    }, 'Base64 编码'),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            setText(outputView, base64Decode(getText(inputView)))
                        }
                    }, 'Base64 解码'),
                    hr({ class: 'dropdown-divider' }),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            setText(outputView, encodeURIComponent(getText(inputView)))
                        }
                    }, 'URL 编码', div({ class: 'small text-secondary' }, 'encodeURIComponent')),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            setText(outputView, decodeURIComponent(getText(inputView)))
                        }
                    }, 'URL 解码', div({ class: 'small text-secondary' }, 'decodeURIComponent')),
                    hr({ class: 'dropdown-divider' }),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            setText(outputView, escape(getText(inputView)))
                        }
                    }, 'Escape 编码'),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            setText(outputView, unescape(getText(inputView)))
                        }
                    }, 'Escape 解码'),
                    hr({ class: 'dropdown-divider' }),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                const inputStr = getText(inputView)
                                const outputStr = JSON.stringify(JSON.parse(inputStr), null, 4)
                                setText(outputView, outputStr)
                            } catch (error) {
                                if (error instanceof Error) setText(outputView, error.message)
                            }
                        }
                    }, 'JSON 格式化'),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            const inputStr = getText(inputView)
                            const outputStr = inputStr.split('\n').map(line => line.trim()).join('\n')
                            setText(outputView, outputStr)
                        }
                    }, '去除每行首尾空格'),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            const inputStr = inputView.state.doc.toString()
                            const outputStr = outputView.state.doc.toString()
                            setText(outputView, inputStr)
                            setText(inputView, outputStr)
                        }
                    }, '交换编辑框'),
                )
            )
        ),
        inputEle,
        outputEle,
    )
}