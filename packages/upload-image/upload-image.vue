<template>
  <div class="thumbnail-wrapper">
    <draggable v-model="imageList" group="image" style="display: inline-block;">
      <div v-for="(image, index) in imageList" :key="index" class="thumbnail">
        <img :src="image">
        <div class="model">
          <i class="el-icon-delete" @click="onDelete(index)"></i>
          <i class="el-icon-upload" @click="onUpload(index)"></i>
          <i class="el-icon-zoom-in" @click="showPreview(index)"></i>
        </div>
      </div>
    </draggable>
    <div v-if="type==='mulitple' || imageList.length < 1" class="thumbnail upload" @click="onUpload()">
      <i class="el-icon-plus"></i>
      <input ref="upload" type="file" @change="uploadFile"/>
    </div>
    <image-viewer :initial-index="previewImageIndex" v-show="previewVisible"  :url-list="imageList" :onClose="() => previewVisible = false" :onSwitch="(val) => previewImageIndex = val"/>
  </div>
</template>
<script>
import { getAgentPolicy } from '@/api/dict'
import upload from '@/utils/upload'
export default {
  name: 'index',
  model: {
    prop: 'images',
    event: 'change'
  },
  components: {
    draggable: () => import('vuedraggable')
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    method: {
      type: String,
      default: 'file' // file or box
    },
    type: {
      type: String,
      default: 'mulitple' // mulitple or single
    }
  },
  data () {
    return {
      previewVisible: false,
      previewImageIndex: 0,
      policy: {},
      imageList: [],
      imageIndex: -1
    }
  },
  watch: {
    images: {
      handler (val) {
        const same = this.imageList.length === val.length && this.imageList.every((item, index) => {
          return val[index] === item
        })
        console.log('val.filter(Boolean)', val.filter(Boolean), same)
        same || (this.imageList = val.filter(Boolean))
      },
      immediate: true
    },
    imageList (val) {
      this.$emit('change', val)
    }
  },
  methods: {
    showPreview (index) {
      this.previewImageIndex = index
      this.previewVisible = true
    },
    onDelete (index) {
      this.imageList.splice(index, 1)
    },
    uploadFile (event) {
      const files = event.target.files

      if (files) {
        upload(this.policy, files[0]).then(url => {
          if (this.imageIndex !== -1) {
            this.imageList.splice(this.imageIndex, 1, url)
          } else {
            this.imageList.push(url)
          }
        })
      }
    },
    openMaterial () {
      this.$materialBox({
        addLimit: this.type === 'mulitple' ? 99 : 1,
        addImage: urls => {
          if (this.imageIndex !== -1) {
            this.imageList.splice(this.imageIndex, 1, ...urls)
          } else {
            this.imageList = this.imageList.concat(urls)
          }
        }
      })
    },
    onUpload (index = -1) {
      this.imageIndex = index
      switch (this.method) {
        case 'file':
          this.$refs.upload.click()
          break
        case 'box':
          this.openMaterial()
          break
      }
    }
  },
  beforeMount () {
    getAgentPolicy().then(data => {
      this.policy = data
    })
  }
}
</script>
<style lang="scss" scoped>
// .thumbnail + .thumbnail {
//   margin-left: 12px;
// }
.thumbnail {
  border-radius: 6px;
  box-sizing: border-box;
  overflow: hidden;
  width: 148px;
  height: 148px;
  line-height: 146px;
  vertical-align: top;
  display: inline-block;
  margin-bottom: 24px;
  margin-right: 12px;
  position: relative;
  cursor: pointer;
  background: #F5F5F5;
  &:hover .model {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }
  img {
    display: block;
    width: 148px;
    height: 148px;
  }
  &.upload {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    text-align: center;
    cursor: pointer;
    outline: 0;
    input[type="file"] {
      display: block;
      visibility: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
  }
}
</style>
