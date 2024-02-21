import van, { State } from 'vanjs-core'
import { SG } from '../../state'
import { mode, pad } from 'crypto-js'

export default new SG({
    aesSet: {
        mode: van.state(<keyof typeof mode>''),
        padding: van.state(<keyof typeof pad>''),
        key: van.state(''),
        iv: van.state(''),
    },
    workType: '' as 'decode' | 'encode'
})