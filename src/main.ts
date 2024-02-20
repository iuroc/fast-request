/// <reference types="vite/client" />
import van from 'vanjs-core'
import Nav from './nav'
import Home from './route/home'
import Api from './route/api'
import Text from './route/text'
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/editor.scss'

van.add(document.body, Nav(), Home(), Api(), Text())