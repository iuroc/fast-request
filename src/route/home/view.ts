import van, { Val } from 'vanjs-core'
import { activeRoute, routeTo } from 'vanjs-router'

const { div } = van.tags

export const Card = (title: string, desc: string, target: string) => {
    return div({ class: 'col-xl-3 col-lg-4 col-sm-6' },
        div({ class: 'card card-body border-2 shadow-sm', role: 'button', onclick: () => routeTo(target) },
            div({ class: 'fw-bold fs-5 mb-2 text-truncate' }, title),
            div({ class: 'text-secondary text-truncate' }, desc)
        )
    )
}