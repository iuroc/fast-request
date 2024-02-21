import van from 'vanjs-core'
import { Route } from 'vanjs-router'
import { Dropdown } from 'bootstrap'
import { TextUtil, exchangeInput } from './mixin'
import { Editor } from './editor'
import ClipboardJS from 'clipboard'

const { button, div, hr } = van.tags
const { svg, path } = van.tagsNS('http://www.w3.org/2000/svg')

export const inputEditor = new Editor()
export const outputEditor = new Editor()

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
                        inputEditor.setText('')
                        outputEditor.setText('')
                    }
                }, '清空'),
                () => {
                    const ele = button({ class: 'btn btn-secondary d-none d-sm-inline-block' }, '复制输入')
                    new ClipboardJS(ele, {
                        text: () => inputEditor.getText()
                    })
                    return ele
                },
                () => {
                    const ele = button({ class: 'btn btn-warning d-none d-sm-inline-block' }, '复制输出')
                    new ClipboardJS(ele, {
                        text: () => outputEditor.getText()
                    })
                    return ele
                },
                button({ class: 'btn btn-primary', onclick: exchangeInput }, svg({ fill: 'currentColor', class: 'bi bi-arrow-down-up', viewBox: '0 0 16 16' },
                    path({ 'fill-rule': 'evenodd', 'd': 'M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5' }),
                )),
                dropBtn,
                div({ class: 'dropdown-menu dropdown-menu-end shadow overflow-auto user-select-none', style: 'max-height: 600px;' },
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                outputEditor.setText(TextUtil.base64Encode(inputEditor.getText()))
                            } catch (error) {
                                if (error instanceof Error) outputEditor.setText(error.message)
                            }
                        }
                    }, 'Base64 编码'),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                outputEditor.setText(TextUtil.base64Decode(inputEditor.getText()))
                            } catch (error) {
                                if (error instanceof Error) outputEditor.setText(error.message)
                            }
                        }
                    }, 'Base64 解码'),
                    hr({ class: 'dropdown-divider' }),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                outputEditor.setText(encodeURIComponent(inputEditor.getText()))
                            } catch (error) {
                                if (error instanceof Error) outputEditor.setText(error.message)
                            }
                        }
                    }, 'URL 编码', div({ class: 'small text-secondary' }, 'encodeURIComponent')),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                outputEditor.setText(decodeURIComponent(inputEditor.getText()))
                            } catch (error) {
                                if (error instanceof Error) outputEditor.setText(error.message)
                            }
                        }
                    }, 'URL 解码', div({ class: 'small text-secondary' }, 'decodeURIComponent')),
                    hr({ class: 'dropdown-divider' }),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                outputEditor.setText(escape(inputEditor.getText()))
                            } catch (error) {
                                if (error instanceof Error) outputEditor.setText(error.message)
                            }
                        }
                    }, 'Escape 编码'),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                outputEditor.setText(unescape(inputEditor.getText()))
                            } catch (error) {
                                if (error instanceof Error) outputEditor.setText(error.message)
                            }
                        }
                    }, 'Escape 解码'),
                    hr({ class: 'dropdown-divider' }),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            try {
                                const inputStr = inputEditor.getText()
                                const outputStr = JSON.stringify(JSON.parse(inputStr), null, 4)
                                outputEditor.setText(outputStr)
                            } catch (error) {
                                if (error instanceof Error) outputEditor.setText(error.message)
                            }
                        }
                    }, 'JSON 格式化'),
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            const inputStr = inputEditor.getText()
                            const outputStr = inputStr.split('\n').map(line => line.trim()).join('\n')
                            outputEditor.setText(outputStr)
                        }
                    }, '去除每行首尾空白'),
                    hr({ class: 'dropdown-divider d-sm-none' }),
                    () => {
                        const ele = div({
                            class: 'dropdown-item d-sm-none', role: 'button'
                        }, '复制输入框')
                        new ClipboardJS(ele, {
                            text: () => inputEditor.getText()
                        })
                        return ele
                    },
                    () => {
                        const ele = div({
                            class: 'dropdown-item d-sm-none', role: 'button'
                        }, '复制输出框')
                        new ClipboardJS(ele, {
                            text: () => outputEditor.getText()
                        })
                        return ele
                    },
                )
            )
        ),
        inputEditor.element,
        outputEditor.element
    )
}