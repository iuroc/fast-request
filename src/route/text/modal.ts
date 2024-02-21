import van from 'vanjs-core'
import state from './state'
import { Modal } from 'bootstrap'

const { button, div } = van.tags

export const AESModalEle = () => {

    return div({ class: 'modal' },
        div({ class: 'modal-dialog' },
            div({ class: 'modal-content' },
                div({ class: 'modal-header' },
                    div({ class: 'modal-title' }, '我是标题')
                ),
                div({ class: 'modal-body' },

                ),
                div({ class: 'modal-footer' },
                    button({ class: 'btn btn-primary' }, () => state.get('workType') == 'decode' ? '解密' : '加密'),
                    button({ class: 'btn btn-secondary', 'data-bs-dismiss': 'modal' }, '关闭')
                )
            )
        )
    )
}

export const initModal = (modalEle: HTMLDivElement) => {
    new Modal(modalEle)
}