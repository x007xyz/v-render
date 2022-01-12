<template>
  <div class="child-form-container">
    <div class="child-form" v-for="(childField, index) in childFormFileds" :key="index">
      <div class="child-form-head">
        {{ item.headerLabel }}{{ index + 1 }}
        <svg
          v-if="foldList.indexOf(childField.randomId) === -1"
          class="cfh-flod"
          viewBox="0 0 16 8"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="8"
          @click="()=>flodChildField(childField.randomId)"
        >
          <path d="M0 0 L16 0 L8 8 Z" fill="#787B87" />
        </svg>

        <svg
          v-if="foldList.indexOf(childField.randomId) > -1"
          class="cfh-unflod"
          viewBox="0 0 16 8"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="8"
          @click="()=>flodChildField(childField.randomId)"
        >
          <path d="M0 8 L16 8 L8 0 Z" fill="#787B87" />
        </svg>

        <div
          class="cfh-del"
          v-if="!textModel"
          @click="()=>allDisabled ? '' : deleteChildForm(childField.randomId)"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACh0lEQVRYCe1Xz2sTQRSeN7uKHoQoBMRKL4I3Ragg2FNvXjTNpUhBemmEpP+Agt4U8VQ8JAUTkCIUodAQRPBk/gEFEfFSvAhVULBFxF/p7vObbCfd2c3uZvaoWQjz5vu+982b2Ql5EeJ/f2iUA1hZfTrh/enNE4tTTJSaQ4yHxHvn4IG16sLlrSz/VDOVXH/YPgfDrmAuZJkZPNEOCp5Zul5+beCRiRuZx6ZYfFktjkp7gugtBH5MFALU/qE9g7GAaBnUTIiOhZkFYPELKouEvF2rzN6POQwB6s2NG4LFPZ07RDKA5CBKDg73KeLtZInJkKCve0iQa9LGzLgD9VbnErN3CwaHtApHORXE9AFn+0XjaSOzKArBk0qDO/tKa1nwLyLnztJi6bnGjFfAvlcFMQ2h5kMjT8K4bxoCM8P9DQRSbFCtMbwA15U3dz3+jnc335eTaGMPI+06uRIuYj/lwI/WXIfuhrXGK1BEo9me8plfqlgSna9VyoMjVJjtk+U3yiW0XdNKb11A/dGz40krpHFJOVYF4Pv9gHu/PzVaGwtRQ4UpTmmiXNrcqgBcyGll5jNdjJruY4EmyifNLQtIssmPjwsYn8D4BOxOgLnfDeHnOtYVDbA9zahfTKsCiOQqfr22pJDr0QUUpjiliXJpc6MfSBMqDi1ZHYP6xJ5q5coLgCdjRAZgdQIZXrnoWAHSoZ/aCcd6TMe5R4eO6lx0Wj90rMdYQ9Ltdt13mzufIUYifUMfuKnFOcfTaMuO4JJuFwuzxbk58sI+sQIUudLqXPV8/zEaS6s7EjY2Y9p1pLxWXSw9MXFsMQroeaPZOcvCL6M9PaGxPCMW+Ij/FO1apfQmT/6/n/MX8KHG8NxlUVYAAAAASUVORK5CYII="
            class="cfh-del-btn"
          />
          <span class="cfh-del-text">删除</span>
        </div>
      </div>
      <div class="child-form-body" v-show="foldList.indexOf(childField.randomId) === -1">
        <el-form
          ref="form"
          :model="val[index]"
          :hide-required-asterisk="textModel"
          :label-width="labelWidth || '130px'"
          :label-position="labelPosition ? labelPosition : 'top'"
        >
          <template v-for="(row, rowIndex) in getFieldRow(childField, childField.randomId)">
            <el-row
              :gutter="20"
              :key="rowIndex"
              class="block-content"
              :class="{[childField.randomId]:true}"
            >
              <template v-for="{rowItem} in row">
                <div :key="rowItem.key">
                  <el-col
                    :span="getColSize(rowItem)"
                    :key="rowItem.key"
                    :style="rowItem.style || {}"
                  >
                    <el-form-item
                      v-if="rowItem.type!=='child-form'"
                      :style="rowItem.style"
                      :class="rowItem.class"
                      :rules="rowItem.rules"
                      :label="getFormItemLabel(rowItem)"
                      :prop="rowItem.key"
                    >
                      <FormInput
                        v-if="rowItem.type==='input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormDate
                        v-if="rowItem.type==='date-input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormHourMinute
                        v-if="rowItem.type==='hour-minute-input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormDateRange
                        v-if="rowItem.type==='date-range-input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormDictSelect
                        v-if="rowItem.type === 'dynamic-select'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormNormalSelect
                        v-if="rowItem.type === 'normal-select'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormNumberInput
                        v-if="rowItem.type === 'number-input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <!-- 动态下拉框，入参是父 key，根据父 key 自动加载列表内容 -->
                      <FormAutoComplete
                        v-if="rowItem.type === 'auto-complete-input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormRadio
                        v-if="rowItem.type === 'radio'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormTextarea
                        v-if="rowItem.type==='textarea'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model="val[index][rowItem.key]"
                      />
                      <FormMoneyInput
                        v-if="rowItem.type==='money-input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormRateInput
                        v-if="rowItem.type==='rate-input'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormMulLinkage
                        v-if="rowItem.type==='mul-linkage'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormNormalNumberInput
                        v-if="rowItem.type==='normal-number'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                      <FormMulSelectNormal
                        v-if="rowItem.type==='mul-select-normal'"
                        v-bind="getProps(rowItem)"
                        :random-id="childField.randomId"
                        v-model.trim="val[index][rowItem.key]"
                      />
                    </el-form-item>
                  </el-col>
                </div>
              </template>
            </el-row>
          </template>
        </el-form>
      </div>
    </div>

    <div
      class="child-form-add-btn"
      v-if="!textModel"
      @click="()=>allDisabled ? '' : addChildForm()"
    >{{ addBtnLabel }}</div>
  </div>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'ChildForm',
  mixins: [FormMixin],
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    },

    addBtnLabel () {
      if (this.item.addBtnLabel) {
        return this.item.addBtnLabel
      } else {
        return `＋ ${this.item.headerLabel}`
      }
    }
  },
  inject: [
    'changeData',
    'statusChangeFn',
    'dynamicDict',
    'dynamicSelectOption',
    'baseURL',
    'enableBaseURLForOthers',
    'getCommonAxios',
    'getSpecialAxios'
  ],
  watch: {
    // 这个是只有当 子表单 的值变化时才会触发的
    // 以下两个示例都会触发。注意，其他情况下不会触发
    // WtiForm.$set(WtiForm.formData, 'key',[{projectName:'12'}]);
    // WtiForm.$set(WtiForm.formData.testInput, '0',{projectName:'12'});
    value (oldVal, newVal) {
      // console.log('oldVal, newVal', oldVal === newVal);
      // 这里的逻辑存在比较难处理的情况：
      // 1. 预期：当初始化，value 为空数组或者不存在的时候，这里可以自动生成一个新行
      // 2. 预期：当编辑模式下，这里的值是后续加载的，期望 fields 可以和 value 进行同步（需要重置）
      // 3. 预期：正常模式下新增、删除行，fields 会随着 value 更新（不应当重置）
      if (!this.value || this.value.length === 0) {
        // this.childFormData = [];
        this.childFormFileds = []
        this.addChildForm()
      } else {
        if (oldVal !== newVal) {
          // 值变化了，应当重置
          this.resetChildFormFileds()
        }
        // 不变化的情况下，不应该进行处理（push 和 splice 会是这种情况）
        // 该种情况下，childFormFileds 由各自的行为进行处理
      }
    }
  },
  mounted () {
    if (this.value && this.value instanceof Array && this.value.length > 0) {
      this.value.forEach((childFormData) => {
        this.addChildForm(childFormData, true)
      })
    } else {
      this.addChildForm()
    }
    // 动态加载需要数据字典的选项
    this.loadDynamicSelectOptions()
  },
  data () {
    return {
      // 子表单的 fileds
      childFormFileds: [],

      // 收起列表
      foldList: [],

      // 子表单是可以独立收起的
      childFormHiddenList: [],
      childFormDisableList: [],

      // 传给子表单的表单元素的
      childChangeData: {
        formKey: this.item.key,
        // 更新其他数据
        updateFormData: this.updateFormData,
        valueUpdateEvent: this.valueUpdateEvent,
        // 设置为必填
        setElementRequired: this.setElementRequired
      }
    }
  },
  provide () {
    return {
      // 子组件收到这个变量后，将知道这个元素是子表单，
      // 因此在部分逻辑上执行时，和默认表单逻辑不通
      formItemType: 'childForm',
      childChangeData: this.childChangeData
    }
  },
  methods: {
    // 监听值更新
    valueUpdateEvent () {
      // const data = this.getData();
      // console.log('data', data);
      // this.$emit('input', data);
    },

    // todo 这里的数据字典请求接口，应该最后合并到一起，由一个专门的数据字典请求管理器去请求，减低接口重复请求的情况
    loadDynamicSelectOptions () {
      const parentCodeList = []
      // console.log('loadDynamicSelectOptions');
      // console.log(JSON.stringify(Object.keys(this.dynamicDict)));
      // 遍历传入的数据
      this.childFormFileds.forEach((fields) => {
        if (fields && fields instanceof Array) {
          fields.forEach((field) => {
            if (field.type === 'dynamic-select' && field.parentKey) {
              // 再做一次去重判断。如果该字典已经在里面了，再跳过这一个
              if (parentCodeList.indexOf(field.parentKey) === -1) {
                if (!this.dynamicDict[field.parentKey]) {
                  parentCodeList.push(field.parentKey)
                  // 初始化一个数组
                  this.$set(this.dynamicDict, field.parentKey, [])
                }
              }
            }
            // 地区选择框，三级联动
            if (field.type === 'area-select') {
              const firstParentKey = field.firstParentKey || '10020'
              const secondParentKey = field.firstParentKey || '10021'
              const thirdParentKey = field.firstParentKey || '10022'
              if (parentCodeList.indexOf(firstParentKey) === -1) {
                if (!this.dynamicDict[firstParentKey]) {
                  parentCodeList.push(firstParentKey)
                  this.$set(this.dynamicDict, firstParentKey, [])
                }
              }
              if (parentCodeList.indexOf(secondParentKey) === -1) {
                if (!this.dynamicDict[secondParentKey]) {
                  parentCodeList.push(secondParentKey)
                  this.$set(this.dynamicDict, secondParentKey, [])
                }
              }
              if (parentCodeList.indexOf(thirdParentKey) === -1) {
                if (!this.dynamicDict[thirdParentKey]) {
                  parentCodeList.push(thirdParentKey)
                  this.$set(this.dynamicDict, thirdParentKey, [])
                }
              }
            }
          })
        }
      })
      if (parentCodeList.length === 0) {
        return
      }

      // 通过父 key 拿到所有元素
      let payload = null
      if (this.dynamicSelectOption.queryKey) {
        payload = {
          [this.dynamicSelectOption.queryKey]: parentCodeList
        }
      } else {
        payload = parentCodeList
      }
      this.getCommonAxios()
        .post(`${this.dynamicSelectOption.dictUrl}`, payload)
        .then((res) => {
          // 兼容性处理
          let data
          // 这里判断是不是 axios 的默认返回数据（未经过请求拦截器处理的）
          if (res.request && res.headers) {
            data = res.data
          } else {
            data = res
          }
          if (data.code === 200) {
            if (data.data.length > 0) {
              // 因为可能多个地方同时调这个接口的原因，为了避免重复将内容添加到里面，所以，
              // 这里在赋值之前，需要先判断一下 parentCodeList 的每个值，其对应的 dynamicDict 里的哪一个数组，是否是空的
              // 如果不是空的，则将其置为空数组
              parentCodeList.forEach((pCode) => {
                if (this.dynamicDict[pCode].length > 0) {
                  this.$set(this.dynamicDict, pCode, [])
                }
              })

              // 加载到结果
              data.data.forEach((item) => {
                // 用每个返回值的 pCode 作为 key，将该项添加到数组里。
                // 注：之所以是数组，是因为之前已经初始化过了（parentKey 为 Code）
                const pCode = item[this.dynamicSelectOption.parentKey]
                this.dynamicDict[pCode].push(item)
              })
            }
          } else {
            this.$message.error(data.msg)
          }
        })
        .catch(() => {
          this.$message.error('数据字典加载错误，请刷新页面重试')
        })
    },

    // 添加一个子表单到 childFormFileds 最后
    addChildForm (childFormData, notAddValue) {
      // 禁用时禁止操作
      const { childrenForm } = this.item
      // 插入 childFormFileds
      const filed = this.deepCopy(childrenForm)
      // 给每个 field 添加一个随机 id
      const randomId = (Math.random() * 100000000).toFixed(0)
      filed.randomId = randomId
      this.childFormFileds.push(filed)

      // 默认禁用
      const defaultDisableList = []
      // 默认隐藏
      const defaultHiddenList = []
      // 给 value 插入一条
      const obj = {}
      childrenForm.forEach((child) => {
        if (childFormData && child.key in childFormData) {
          obj[child.key] = childFormData[child.key]
        } else {
          // 2.2 该要素没有默认值，使用通用默认值
          if (
            child.type === 'mul-linkage' ||
            child.type === 'mul-select-normal'
          ) {
            obj[child.key] = child.defaultValue || []
          } else {
            obj[child.key] = child.defaultValue || ''
          }
        }
        if (child.disableDefault) {
          defaultDisableList.push(child.key)
        }
        if (child.hiddenDefault) {
          defaultHiddenList.push(child.key)
        }
      })
      if (!notAddValue) {
        this.val.push(obj)
      }

      const formKey = this.item.key

      defaultDisableList.forEach((disableKey) => {
        const keyText = `${formKey}_${randomId}_${disableKey}`
        // this.statusChangeFn.setElementHidden(keyText, false);
        this.statusChangeFn.setElementDisable(keyText)
      })
      defaultHiddenList.forEach((disableKey) => {
        const keyText = `${formKey}_${randomId}_${disableKey}`
        this.statusChangeFn.setElementHidden(keyText)
      })
    },

    // 表单组件是否显示
    isShow (item, randomId) {
      // 如果是子表单里的元素的话，采用三段匹配
      const formKey = this.item.key
      // const randomId = item.randomId;
      const key = item.key
      const keyText = `${formKey}_${randomId}_${key}`
      // console.log('isShow', keyText);
      // 如果该要素在隐藏列表里，则不显示
      if (this.changeData.hiddenKeyList.indexOf(keyText) > -1) {
        return false
      }
      return true
    },

    // 对一个 block 下的要素，进行 el-row 的分行
    getFieldRow (children, randomId) {
      // 一个二维数组，每个数组要素是 el-row 的一行
      const list = []
      if (!children) {
        return list
      }
      children.forEach((item) => {
        // 如果当前要素不显示，则直接跳过
        if (!this.isShow(item, randomId)) {
          return
        }
        const currentSpan = this.getColSize(item)
        // 如果初始为空
        if (list.length === 0) {
          const obj = {
            // 获取到他有多少 span，满 24 为一行
            span: currentSpan,
            rowItem: Object.assign({}, item, {
              randomId
            })
          }
          list.push([obj])
          return
        }
        // 如果初始不为空，
        // 1、判断有没有打开 （当前这个的）【默认在新行第一列】开关
        // 又或者是当前是不是子表单（item.type === 'child-form'表示是子表单）
        if (item.nextRowFirst || item.type === 'child-form') {
          // 如果是新行第一列，那么直接把这个添加到 list 里面
          const obj = {
            // 获取到他有多少 span，满 24 为一行
            span: currentSpan,
            rowItem: Object.assign({}, item, {
              randomId
            })
          }
          list.push([obj])
          return
        }
        // 2、判断（上一个）【默认是本行最后一列】开关是否打开
        // 先拿到最后一行
        const listLastItem = list[list.length - 1]
        // 的最后一个是否打开了这个开关
        if (listLastItem[listLastItem.length - 1].rowItem.currentRowLast) {
          // 如果打开这个开关，那么当前这个直接放到下一行的第一个
          const obj = {
            // 获取到他有多少 span，满 24 为一行
            span: currentSpan,
            rowItem: Object.assign({}, item, {
              randomId
            })
          }
          list.push([obj])
          return
        }

        // 下拉正常计算 span 来决定是否换行
        // 那么计算 list 最后一个数组里面所有加起来的 span 的值
        const lastTotalSpan = list[list.length - 1]
          .map((item) => item.span)
          .reduce((lastTotal, currentItem) => {
            return lastTotal + currentItem
          })

        // 如果已经大于等于 24 了，说明满了一行，那么直接创建新行
        // 或者是当前这个加之前的大于 24，那么说明这个放在之前那行超过 24，所以也要放到新行去
        if (lastTotalSpan >= 24 || lastTotalSpan + currentSpan > 24) {
          const obj = {
            // 获取到他有多少 span，满 24 为一行
            span: currentSpan,
            rowItem: Object.assign({}, item, {
              randomId
            })
          }
          list.push([obj])
        } else {
          // 此时说明当前这个可以放到之前哪一行
          const obj = {
            // 获取到他有多少 span，满 24 为一行
            span: currentSpan,
            rowItem: Object.assign({}, item, {
              randomId
            })
          }
          list[list.length - 1].push(obj)
        }
      })
      return list
    },

    // 更新数据
    updateFormData (data, randomId) {
      let index = -1
      this.childFormFileds.forEach((item, i) => {
        if (item.randomId === randomId) {
          index = i
        }
      })

      Object.keys(data).forEach((key) => {
        // 如果 key 在值里面
        if (key in this.value[index]) {
          // 则回填这个值
          this.$set(this.value[index], key, data[key])
        }
      })
    },

    // 设置某个要素必填
    // key：操作的 key
    // randomId：该子表单的随机 id
    // beHidden：必填，默认是 true，表示隐藏。而 false，表示取消隐藏
    setElementRequired (key, randomId, beRequired = true) {
      // 先获取
      const currentField = this.childFormFileds.filter(
        (item) => item.randomId === randomId
      )[0]

      // 设置必填
      if (beRequired) {
        // 先找到这个要素，如果其本身必填，则跳过。
        // 遍历传入的数据
        if (currentField && currentField instanceof Array) {
          currentField.forEach((field) => {
            // 如果 key 不匹配，则跳过
            if (field.key !== key) {
              return
            }
            // 先判断有没有 rules 这个属性，没有则添加这个属性，并且添加必填项然后返回
            if (!field.rules) {
              this.$set(field, 'rules', [
                {
                  required: true,
                  message: '请输入',
                  trigger: ['blur', 'change']
                }
              ])
              return
            }

            // 遍历 其 rules，
            const { rules } = field
            // 是否有 required 这条规则
            let haveRequired = false
            // 是否已修改
            let changed = false
            rules.forEach((rule) => {
              // 如果有 required 属性
              if ('required' in rule) {
                haveRequired = true
                // 如果值为 true，则跳过
                if (rule.required) {
                } else {
                  // 否则修改其为 true
                  rule.required = true
                  changed = true
                }
              }
            })
            // 如果已修改，那么说明没必要继续操作了，跳过
            if (changed) {
              return
            }
            // 如果没修改，并且没有必填规则
            // （注意，如果有规则，那么必然已修改。所以只存在有规则已修改、未修改有规则、未修改无规则三种情况）
            if (!haveRequired) {
              // 添加规则
              rules.push({
                required: true,
                message: '请输入',
                trigger: ['blur', 'change']
              })
            }
          })
        }
      } else {
        // 取消必填
        // 不含必填规则的话，则跳过。如果含必填规则，则添加
        if (currentField && currentField instanceof Array) {
          currentField.forEach((field) => {
            // 如果 key 不匹配，则跳过
            if (field.key !== key) {
              return
            }

            // 先判断有没有 rules 这个属性，没有则添加这个属性，并且添加必填项然后返回
            if (!field.rules) {
              return
            }
            // 如果有，则遍历并删除
            let i = -1
            field.rules.forEach((rule, index) => {
              if ('required' in rule) {
                i = index
              }
            })
            if (i !== -1) {
              field.rules.splice(i, 1)
            }
          })
        }
      }
    },

    // 执行校验
    validateForm () {
      return new Promise((resolve, reject) => {
        Promise.all(this.$refs.form.map((form) => this.validateItem(form)))
          .then(resolve)
          .catch(reject)
      })
    },

    // 校验单个表单
    validateItem (form) {
      return new Promise((resolve, reject) => {
        form.validate((isPass) => {
          if (isPass) {
            resolve()
          } else {
            reject(new Error())
          }
        })
      })
    },

    // 收起/展开表单
    flodChildField (randomId) {
      const i = this.foldList.indexOf(randomId)
      if (i > -1) {
        this.foldList.splice(i, 1)
      } else {
        this.foldList.push(randomId)
      }
    },

    // 某个子表单删除时调用
    deleteChildForm (randomId) {
      // 禁用时禁止操作
      if (this.allDisabled) {
        return
      }
      let i = -1
      this.childFormFileds.forEach((field, index) => {
        if (field.randomId === randomId) {
          i = index
          // 还要记得删除父组件里，disableList，hiddenKeyList
          field.forEach((fieldFormItem) => {
            const formKey = this.item.key
            const key = fieldFormItem.key
            const keyText = `${formKey}_${randomId}_${key}`
            this.statusChangeFn.setElementHidden(keyText, false)
            this.statusChangeFn.setElementDisable(keyText, false)
          })
        }
      })

      this.childFormFileds.splice(i, 1)
      this.val.splice(i, 1)
      this.valueUpdateEvent()

      if (this.val.length === 0) {
        this.addChildForm()
      }
    },

    // 重置子表单结构
    // 注意：这会导致 禁用、隐藏的 元素消失
    resetChildFormFileds () {
      const { childrenForm } = this.item

      this.childFormFileds = []
      // 这里的目的是为了生成 fields
      this.value.forEach(() => {
        const filed = this.deepCopy(childrenForm)
        // 给每个 field 添加一个随机 id
        const randomId = (Math.random() * 100000000).toFixed(0)
        filed.randomId = randomId
        this.childFormFileds.push(filed)
      })
    },

    // 重置内容（子表单数量不变）
    resetFields () {
      const { childrenForm } = this.item
      const obj = {}

      childrenForm.forEach((child) => {
        obj[child.key] = child.defaultValue || ''
      })
      this.value.forEach((item) => {
        Object.keys(item).forEach((k) => {
          this.$set(item, k, obj[k])
          item[k] = obj[k]
        })
      })
    },

    getProps (rowItem) {
      return {
        item: rowItem,
        allDisabled: this.allDisabled
      }
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
.child-form-container {
  width: 100%;

  .child-form {
    background: #f8f9fb;
    border-radius: 4px;
    margin-bottom: 24px;

    .child-form-head {
      position: relative;
      height: 44px;
      line-height: 44px;
      text-align: left;
      padding: 0 20px;
      font-size: 14px;
      color: #3a4566;
      border-bottom: 1px solid #e7e8eb;
      font-weight: 500;

      .cfh-flod,
      .cfh-unflod {
        position: absolute;
        top: 19px;
        right: 24px;
        width: 12px;
        height: 6px;
        cursor: pointer;
        user-select: none;
      }

      .cfh-del {
        position: absolute;
        top: 0;
        right: 55px;
        height: 44px;
        line-height: 44px;
        cursor: pointer;
        user-select: none;

        .cfh-del-btn {
          position: relative;
          height: 16px;
          width: 16px;
          margin-top: 14px;
          vertical-align: top;
        }

        .cfh-del-text {
          display: inline-block;
          position: relative;
          height: 44px;
          line-height: 44px;
          vertical-align: top;
          font-size: 14px;
          color: #949aae;
          font-weight: 400;
        }
      }
    }

    .child-form-body {
      padding: 0 20px;
    }
  }

  .child-form-add-btn {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fbfcfd;
    border: 1px dashed #abb3cc;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    color: #12182a;
    cursor: pointer;
  }
}
</style>
