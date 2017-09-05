<template xmlns="http://www.w3.org/1999/html">
  <div class="add">
    <div class="img-to-load">
      <img src="./pic_addstore.png"/>
      <img src="./icon_name.png"/>
      <img src="./icon_tag.png"/>
      <img src="./icon_position.png"/>
      <img src="./icon_pulldown.png"/>
      <img src="./icon_photo.png"/>
      <img src="../entry/wave.png"/>
    </div>
    <div class="header-title">
      <img class="bg-wave" src="../entry/wave.png"/>
      <img class="round-icon" src="./pic_addstore.png">
    </div>
    <div class="form">
      <div class="inputs">
        <div class="input-name">
          <span class="icon"></span>
          <input type="text" placeholder="店铺名称" tabindex="1" v-model="shopName"/>
        </div>
        <div class="input-location">
          <span class="icon"></span>
          <input type="text" placeholder="店铺地址" tabindex="2" v-model="shopLocation"/>
        </div>
        <div class="input-type">
          <span class="icon"></span>
          <div class="pulldown-wrapper">
            <ul class="type-list" :class="{ 'show': !listHidden }">
              <li v-for="(item, i) in items" @click="selectedIndex = i">
                {{item}}
              </li>
            </ul>
            <div @focus="showList" @blur="hideList" tabindex="3">
              <input type="text" disabled placeholder="选择分类" :value="items[selectedIndex]"/>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="upload-file">
        <input type="file" ref="fileSelector"/>
        <div class="touch-to-choose" tabindex="4" @click="chooseImage">
          <div v-show="!fileB64">
            <img src="./icon_photo.png">
            <span>上传图片</span>
          </div>
          <img class="preview" :src="fileB64" v-show="fileB64">
        </div>
      </div>
      <button class="submit-button" tabindex="5" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import { getTypes, wait, uploadImage, userAddNewShop, waitImageToLoad } from '../../service'
export default {
  data () {
    return {
      // todo
      items: [],
      listHidden: true,
      selectedIndex: -1,
      fileB64: '',
      imageData: {},
      shopName: '',
      shopLocation: '',
      shopType: ''
    }
  },
  methods: {
    async chooseImage () {
      this.$refs.fileSelector.click()
      const file = await new Promise((resolve) => {
        this.$refs.fileSelector.addEventListener('change', () => {
          resolve(this.$refs.fileSelector.files[0])
        })
      })
      this.$tip.open('正在上传图片...', '#50d467', 0)
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      let base64String = await new Promise((resolve, reject) => {
        fileReader.onload = (e) => {
          resolve(e.target.result)
        }
        fileReader.onerror = (err) => {
          this.$tip.open('加载失败，请刷新！')
          reject(err)
        }
      })

      if (file.size >= 1024 * 500) {
        // 文件太大
        let image = new Image()
        image.src = base64String
        await new Promise((resolve) => {
          if (image.complete) {
            resolve()
          } else {
            image.onload = () => {
              if (image.width > 0 && image.height > 0) {
                resolve()
              }
            }
          }
        })
        const canvas = document.createElement('CANVAS')
        const ctx = canvas.getContext('2d')
        canvas.width = 800
        canvas.height = 800 * image.height / image.width
        ctx.drawImage(
          image,
          0, 0,
          image.width,
          image.height,
          0, 0,
          canvas.width,
          canvas.height
        )
        base64String = canvas.toDataURL()
      }

      this.fileB64 = base64String
      try {
        this.imageData = await uploadImage(this.fileB64)
      } catch (e) {
        this.$tip.open('上传失败，请重试!')
        this.fileB64 = ''
        throw e
      }
      this.fileB64 = this.imageData.simgUrl
      this.$tip.open('上传成功!', '#50d467', 1500)
    },
    showList () {
      this.listHidden = false
    },
    async hideList () {
      await wait(100)
      this.listHidden = true
    },
    async submit () {
      if (this.shopName && this.shopLocation && this.items[this.selectedIndex] && this.fileB64) {
        await userAddNewShop(
          this.shopName,
          this.shopLocation,
          this.imageData.url,
          this.imageData.simgUrl,
          this.imageData.width,
          this.imageData.height
        )
        this.$tip.open('添加成功!', '#50d467', 1500)
      } else {
        this.$tip.open('请完整填写表单!')
      }
    }
  },
  async mounted () {
    // 生成图片加载的 Promise
    const images = Array.from(document.querySelectorAll('.img-to-load > img'))
    const imagesLoadPromise = images.map((image) => {
      return waitImageToLoad(image)
    })
    // 等待图片加载的 Promise resolve
    await Promise.all(imagesLoadPromise)
    window.closeLoading()
    this.items = await getTypes()
  }
}
</script>

<style lang="stylus" scoped>
.add {
  display flex
  flex-direction column
  height 100%
}
.img-to-load {
  display none
}
.header-title {
  position relative
  flex-shrink 0
  .bg-wave {
    width 100%
  }
  .round-icon {
    position absolute
    bottom 0
    width 5rem
    height 5rem
    left 0
    right 0
    margin auto
    transform scale(0.9)
  }
}


.form {
  padding 2.0rem 1.5rem
  display flex
  flex-direction column
  .inputs {
    position relative
    z-index 9
    flex-grow 1
    padding 0 1rem
    > div {
      margin-bottom 1.5rem
      height 1.5rem
      border-bottom 1px solid #bdbdbd
      display flex
      flex-direction row
      padding-bottom 0.1rem
      span {
        width 2rem
        flex-shrink 0
        background-size auto 75%
        background-repeat no-repeat
        background-position 50% 50%
      }
      input {
        border 0
        padding 0
        flex-grow 1
        font-size 0.75rem
        color #5e5e5e
      }
      input[disabled] {
        background-color #ffffff
      }
    }
    .input-name {
      span {
        background-image url('./icon_name.png')
      }
    }
    .input-location {
      span {
        background-image url('./icon_position.png')
      }
    }
    .input-type {
      .pulldown-wrapper {
        position relative
        display flex
        flex-direction row
        flex-grow 1
        div {
          flex-grow 1
          display flex
          flex-direction row
        }
        /*
        height 0
        transform translate3d(0,-0.2rem,0)
        transition transform 0.4s
        overflow hidden
        */
      }
      span:first-child {
        background-image url('./icon_tag.png')
      }
      span:last-child {
        background-image url('./icon_pulldown.png')
      }
    }
  }
}


.upload-file {
  input {
    display none
  }
  .touch-to-choose {
    width 70%
    margin auto
    height 8rem
    border 2px dashed #A8A8A8
    border-radius 0.4rem
    background-color #f1f1f1
    transform scale((7/8))
    div {
      width 30%
      left 35%
      right 35%
      position relative
      top 30%
      img {
        margin 0 auto
        display block
        height 2.2rem
      }
      span {
        display block
        font-size 0.65rem
        text-align center
        margin-top 0.5rem
        color #818181
      }
    }
    .preview {
      position absolute
      width 100%
      height 100%
    }
  }
}

.submit-button {
  width 80%
  height 2rem
  background-color #FFAC00
  border-radius 1rem
  border 0
  box-shadow rgba(215, 142, 37, 0.40) 0 0 0.5rem 0.05rem
  font-size 0.75rem
  color #FFFFFF
  margin 1.6rem auto 0
}

.type-list {
  transform scale(0.96)translate3d(0,-0.2rem,0)
  transform-origin 0 0
  opacity 0
  list-style none
  position absolute
  width 100%
  margin 0
  padding 0 0.5rem
  box-sizing border-box
  font-size 0.7rem
  height 0
  overflow auto
  border-radius 0.4rem
  background-color #ffffff
  transition transform 0.4s, opacity 0.4s
  li {
    display block
    height 2rem
    line-height 2rem
    transform translate3d(0,-10%,0)
    text-align center
    border-bottom 1px #dbdbdb solid
    &:last-child {
      border-bottom 1px transparent solid
    }
    &:hover {
      background-color #e8e8e8
    }
  }
  &.show {
    box-shadow 0 0.1rem 0.5rem 1px rgba(120,120,120,0.1)
    height 10rem
    transform scale(0.96)
    opacity 1
  }
}
</style>
