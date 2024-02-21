/// <reference types="vite/client" />
import van from 'vanjs-core'
import Nav from './nav'
import Home from './route/home'
import Api from './route/api'
import Text from './route/text'
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/editor.scss'
import { AESModalEle } from './route/text/modal'
import { Modal } from 'bootstrap'

const aesModalEle = AESModalEle()
van.add(document.body, Nav(), Home(), Api(), Text(), aesModalEle)

initMoal()
