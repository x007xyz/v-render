import { v4 as uuidv4 } from 'uuid'
export default (data, file, { unique = true, limitSize = 50, accept }) => {
  // 获取文件名
  const fileName = unique ? (uuidv4() + '.' + file.name.replace(/.+\./, '')) : file.name
  data.key = data.dir + '/' + fileName
  // 设置提交表单内容
  const formData = new FormData()
  // 需要按照此顺序
  formData.append('policy', data.policy)
  formData.append('OSSAccessKeyId', data.accessid)
  formData.append('signature', data.signature)
  formData.append('expire', data.expire)
  formData.append('key', data.key)
  formData.append('file', file)

  return new Promise((resolve, reject) => {
    if (file.size / 1024 / 1024 > limitSize) { // 默认限定50兆
      return reject(new Error(`File size should not exceed ${limitSize} megabytes ！`))
    }
    const xhr = new XMLHttpRequest()
    xhr.onerror = function error (e) {
      console.log(e)
      reject(e)
    }
    xhr.onload = function onload () {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(xhr.status)
      }
      console.log(`${data.host}/${data.key}`)
      resolve(`${data.host}/${data.key}`)
    }
    xhr.open('post', data.host, true)
    // xhr.withCredentials = true
    xhr.send(formData)
  })
}
