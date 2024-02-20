import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import { basicSetup } from 'codemirror'
import van from 'vanjs-core'

const { div } = van.tags

export class Editor {
    public view: EditorView
    public element: HTMLDivElement
    public constructor() {
        this.element = div({ class: 'text-editor border border-3 rounded-3 overflow-hidden mb-3' })
        this.view = new EditorView({
            parent: this.element,
            state: EditorState.create({
                extensions: [
                    basicSetup,
                    EditorView.lineWrapping,
                    keymap.of([indentWithTab]),
                    indentUnit.of('    '),
                ]
            })
        })
    }
    public setText = (str: string) => {
        this.view.dispatch({
            changes: {
                from: 0,
                to: this.view.state.doc.length,
                insert: str
            }
        })
    }

    public getText = () => {
        return this.view.state.doc.toString()
    }
}