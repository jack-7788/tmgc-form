- 改值
- 先根据name 获取组件 dom
var select19182 = this.getWidgetRef('select19182')
select19182.setValue('MBGL-22G6')
select19182.field.optionItems.find(item=>item)
this.getWidgetRef('select19182').setValue(ops.projectName)
this.getWidgetRef('datatable29011').setDataSource(ops.projectName)
this.getFormRef().showDrawer(name)
this.getFormRef().showDialog(name)
this.setFormData({...data})
this.getFormData()
this.onFormUpdate()
this.getFormRef().onFormUpdate()
this.getFormRef().getFormData().then(res=>{
  console.log('res',res)
})

 cont res = await  this.getWidgetRef('vfbox51811').getFormRef().getWidgetRef('button33773').onBtnSubmit()
 this.getWidgetRef('vfbox51811')//获取 box容器
 .getFormRef()//获取 box容器 中的渲染器 form
 .getWidgetRef('button33773')//获取 box容器 中的渲染器 form 中的某一个组件
 .onBtnSubmit()//获取 box容器 中的渲染器 form 中的某一个组件 ，调用其中的方法

const res =this.getWidgetRef('vfcollapse51277').getFormRef()
