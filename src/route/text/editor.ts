import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import { basicSetup } from 'codemirror'

export const setupEditor = (editorEle: HTMLDivElement) => {
    return new EditorView({
        parent: editorEle,
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

export const setText = (view: EditorView, str: string) => {
    view.dispatch({
        changes: {
            from: 0,
            to: view.state.doc.length,
            insert: str
        }
    })
}

export const getText = (view: EditorView) => {
    return view.state.doc.toString()
}