<template>
  <div class="child-form-container">
    <div class="child-form" v-for="(data, index) in value" :key="index">
      <div class="child-form-head">
        {{ headerLabel }}{{ index + 1 }}
        <!-- <svg
          v-if="foldList.indexOf(data.randomId) === -1"
          class="cfh-flod"
          viewBox="0 0 16 8"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="8"
          @click="()=>flodChildField(data.randomId)"
        >
          <path d="M0 0 L16 0 L8 8 Z" fill="#787B87" />
        </svg>

        <svg
          v-if="foldList.indexOf(data.randomId) > -1"
          class="cfh-unflod"
          viewBox="0 0 16 8"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="8"
          @click="()=>flodChildField(data.randomId)"
        >
          <path d="M0 8 L16 8 L8 0 Z" fill="#787B87" />
        </svg>

        <div
          class="cfh-del"
          v-if="!textModel"
          @click="()=>allDisabled ? '' : deleteChildForm(data.randomId)"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACh0lEQVRYCe1Xz2sTQRSeN7uKHoQoBMRKL4I3Ragg2FNvXjTNpUhBemmEpP+Agt4U8VQ8JAUTkCIUodAQRPBk/gEFEfFSvAhVULBFxF/p7vObbCfd2c3uZvaoWQjz5vu+982b2Ql5EeJ/f2iUA1hZfTrh/enNE4tTTJSaQ4yHxHvn4IG16sLlrSz/VDOVXH/YPgfDrmAuZJkZPNEOCp5Zul5+beCRiRuZx6ZYfFktjkp7gugtBH5MFALU/qE9g7GAaBnUTIiOhZkFYPELKouEvF2rzN6POQwB6s2NG4LFPZ07RDKA5CBKDg73KeLtZInJkKCve0iQa9LGzLgD9VbnErN3CwaHtApHORXE9AFn+0XjaSOzKArBk0qDO/tKa1nwLyLnztJi6bnGjFfAvlcFMQ2h5kMjT8K4bxoCM8P9DQRSbFCtMbwA15U3dz3+jnc335eTaGMPI+06uRIuYj/lwI/WXIfuhrXGK1BEo9me8plfqlgSna9VyoMjVJjtk+U3yiW0XdNKb11A/dGz40krpHFJOVYF4Pv9gHu/PzVaGwtRQ4UpTmmiXNrcqgBcyGll5jNdjJruY4EmyifNLQtIssmPjwsYn8D4BOxOgLnfDeHnOtYVDbA9zahfTKsCiOQqfr22pJDr0QUUpjiliXJpc6MfSBMqDi1ZHYP6xJ5q5coLgCdjRAZgdQIZXrnoWAHSoZ/aCcd6TMe5R4eO6lx0Wj90rMdYQ9Ltdt13mzufIUYifUMfuKnFOcfTaMuO4JJuFwuzxbk58sI+sQIUudLqXPV8/zEaS6s7EjY2Y9p1pLxWXSw9MXFsMQroeaPZOcvCL6M9PaGxPCMW+Ij/FO1apfQmT/6/n/MX8KHG8NxlUVYAAAAASUVORK5CYII="
            class="cfh-del-btn"
          />
          <span class="cfh-del-text">删除</span>
        </div> -->
      </div>
      <div class="child-form-body">
        <el-form
          ref="form"
          :model="value[index]"
          :label-width="labelWidth"
          :label-position="labelPosition"
        >
          <template v-for="(row, rowIndex) in curFields">
            <el-row
              :gutter="20"
              :key="rowIndex"
              class="block-content"
            >
              <template v-for="rowItem in row">
                <div :key="rowItem.key">
                  <el-col
                    :span="rowItem.span"
                    :key="rowItem.key"
                    :style="rowItem.style || {}"
                  >
                    <el-form-item
                      v-if="rowItem.type!=='child-form'"
                      :style="rowItem.style"
                      :class="rowItem.class"
                      :rules="rowItem.rules"
                      :label="rowItem.label"
                      :prop="rowItem.key"
                    >
                      <NormalInput
                        v-if="rowItem.type==='input'"
                        v-model.trim="data[rowItem.key]"
                        v-bind="rowItem.props"
                      ></NormalInput>
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
      @click="addChildForm"
    >{{ addBtnLabel }}</div>
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { getFieldRow, getAllFields } from '../render-form/utils.js'
export default {
  name: 'ChildForm',
  components: {
    NormalInput: () => import('../normal-input')
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '130px'
    },
    labelPosition: {
      type: String,
      default: 'top'
    },
    textModel: {
      type: Boolean,
      default: false
    },
    addBtnLabel: {
      type: String,
      default: '新增'
    },
    headerLabel: String,
    value: {
      type: Array,
      default () {
        return []
      }
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // 完整的fields，合并了默认值，全局设置
    allFields () {
      return getAllFields(clonedeep(this.fields), { allDisabled: this.disabled, textModel: this.textModel })
    },
    curFields () {
      const fields = this.allFields.filter(field => !field.hidden)
      return getFieldRow(fields)
    }
  },
  watch: {
    value: {
      handler (data) {
        if (!data || data.length === 0) {
          const res = {}
          this.allFields.forEach(field => {
            res[field.key] = field.defaultValue
          })
          this.$emit('input', [res])
        }
      },
      immediate: true
    }
  },
  methods: {
    addChildForm () {
      const res = {}
      this.allFields.forEach(field => {
        res[field.key] = field.defaultValue
      })
      this.$emit('input', this.value.concat(res))
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
