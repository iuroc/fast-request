import { activeRoute, routeTo } from 'vanjs-router'
import van from 'vanjs-core'

const { div } = van.tags

const NavItem = (text: string, activeRoutes: string[]) => {
    const classStr = van.derive(() => {
        return 'nav-link' + (activeRoutes.indexOf(activeRoute.val.name) == -1 ? '' : ' active')
    })
    return div({ class: 'nav-item' },
        div({ class: classStr, role: 'button', onclick: () => routeTo(activeRoutes[0]) }, text)
    )
}

export default () => div({ class: 'navbar navbar-expand bg-success-subtle' },
    div({ class: "container" },
        div({ class: 'navbar-brand text-success-emphasis', role: 'button', onclick: () => routeTo('home') }, 'Fast Request'),
        div({ class: 'collapse navbar-collapse' },
            div({ class: 'navbar-nav' },
                NavItem('发送请求', ['api']),
                NavItem('文本工具', ['text']),
            )
        )
    )
)