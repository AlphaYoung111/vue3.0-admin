import { Button,Form,Input,FormItem,Row,Col } from 'element-ui'

let ele = {
  install: function (Vue) {
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(Input)
    Vue.use(FormItem)
    Vue.use(Row)
    Vue.use(Col)
  }
}

export default ele