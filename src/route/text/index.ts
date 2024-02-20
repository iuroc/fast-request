import van from 'vanjs-core'
import { Route } from 'vanjs-router'
import { Dropdown } from 'bootstrap'
import { TextUtil } from './mixin'
import { Editor } from './editor'

const { button, div, hr } = van.tags

const inputEditor = new Editor()
const outputEditor = new Editor()

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
                dropBtn,
                div({ class: 'dropdown-menu dropdown-menu-end shadow overflow-auto', style: 'max-height: 600px;' },
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
                    div({
                        class: 'dropdown-item', role: 'button', onclick() {
                            const inputStr = inputEditor.getText()
                            const outputStr = outputEditor.getText()
                            if (inputStr != outputStr) {
                                inputEditor.setText(outputStr)
                                outputEditor.setText(inputStr)
                            }
                        }
                    }, '交换编辑框'),
                )
            )
        ),
        inputEditor.element,
        outputEditor.element
    )
} 