import Vue from 'vue'
import { Button, Modal, Table, Card, Icon, Notice} from 'view-design'

Vue.component('Button', Button)
Vue.component('Modal', Modal)
Vue.component('Table', Table)
Vue.component('Card', Card)
Vue.component('Icon', Icon)

Vue.prototype.$Notice = Notice

import 'view-design/dist/styles/iview.css'
