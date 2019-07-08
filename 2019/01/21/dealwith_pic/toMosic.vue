<template>
  <div class="p-mosaic">
    <!-- <Button type="primary" @click="modifyClick">图片编辑</Button> -->
    <Modal ref="mosaicCanvasModal" width="800" :mask-closable="false" v-model="editModal" title="图片编辑" @on-cancel="canvasCancel" :scrollable="false">
      <div class="paint">
        <!-- 控制台 -->
        <div class="paint-console">
          <Form ref="moasicControl" :model="casConfig" :label-width="80" inline>
            <FormItem label="马赛克类型" prop="style">
              <Select v-model="casConfig.style" style="width:168px">
                <Option v-for="item in styleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="模糊程度" prop="masaicLevel">
              <InputNumber :max="100" :min="5" :step="5" v-model="casConfig.masaicLevel"></InputNumber>
            </FormItem>
            <FormItem label="马赛克颜色" v-if="casConfig.style=='drawMBlock'">
              <ColorPicker v-model="casConfig.color1" />
              <ColorPicker v-model="casConfig.color2" />
            </FormItem>
            <FormItem :label-width="20">
              <Button type="primary" @click="clearCanvas()" style="height:32px">清空画布</Button>
            </FormItem>
            <div>
              <FormItem label="图片名称" prop="name">
                <Input v-model="casConfig.name"></Input>
              </FormItem>
              <FormItem label="图片格式" prop="type">
                <Select v-model="casConfig.type" style="width:80px" placeholder="图片格式">
                  <Option value="jpg">JPG</Option>
                  <Option value="png">PNG</Option>
                  <Option value="jpeg">JPEG</Option>
                </Select>
              </FormItem>
              <!-- <FormItem :label-width="20">
                <Button type="primary" @click="downLoad()" style="height:32px">下载图片</Button>
              </FormItem> -->
              <FormItem :label-width="20">
                <Button type="primary" style="height:32px" @click="uploadClick">上传图片</Button>
              </FormItem>
            </div>
          </Form>
        </div>
        <!-- 画布 -->
        <div class="canvas-part" ref="canvasPart">
          <canvas ref="mosaicCanvas" @mousedown="canvasMousedown" @mouseover="canvasMouseover" :width="casConfig.width" :height="casConfig.height"></canvas>
        </div>
        <div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editModal: false,
      casConfig: {
        height: 420,
        width: 770,
        color1: '#888995',
        color2: '#ECEEE1',
        penWidth: 1,
        imgUrl: require('../assets/img/1.jpg'),
        // imgUrl:
        //   'http://hygjtest.oss-cn-hangzhou.aliyuncs.com/hygj/apply/mygirl.jpg',
        // imgUrl: this.pictrueImg,
        // imgUrl: 'http://p1.pstatp.com/large/435d000085555bd8de10',
        // imgUrl:"http://static.huanyueguoji.com/hygj/apply/timg.jpg",
        // imgUrl:"http://hygjtest.oss-cn-hangzhou.aliyuncs.com/hygj/apply/timg.jpg",
        type: 'jpg',
        style: 'drawMosaic',
        name: '测试图片',
        masaicLevel: 5
      },
      paintCanvas: null,
      cxt: null,
      dottedOptions: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      },
      styleList: [
        {
          value: 'drawMosaic',
          label: '马赛克类型Ⅰ'
        },
        {
          value: 'drawMBlock',
          label: '马赛克类型Ⅱ'
        }
      ],
      editCavsModalDom: null,
      drawDotted: false
    }
  },
  props: ['mosaicData', 'showModify'],
  created() {
    // this.modifyClick()
  },
  watch: {
    showModify: function(newValue) {
      if (newValue) {
        this.casConfig.name = this.mosaicData.fileName
        if (this.$envC.type !== 'development') {
          this.casConfig.imgUrl = this.mosaicData.docUrl.replace(
            this.$envC.imgUrl,this.$envC.imgReplace)
        }
        this.$lib.goScrollTop(0)
        console.log(this.mosaicData.docUrl)
        this.modifyClick()
      } else {
        this.editModal = false
      }
    }
  },
  methods: {
    /**
     * 点击出现编辑图片弹窗
     */
    modifyClick() {
      this.editModal = true
      this.$nextTick(() => {
        this.init()
      })
    },
    /**
     * 初始化画图
     */
    init() {
      this.paintCanvas = this.$refs.mosaicCanvas
      this.canvasPart = this.$refs.canvasPart
      this.cxt = this.paintCanvas.getContext('2d')
      this.$lib.cavPushImg({
        canvas: this.paintCanvas,
        url: this.casConfig.imgUrl,
        w: this.casConfig.width,
        h: this.casConfig.height
      })
      this.$lib.addEventListener(document, 'mouseup', this.documentMouseup)
    },
    /**
     * 下载二维码
     */
    downLoad() {
      this.$lib.cavToimg({
        type: this.casConfig.type,
        canvas: this.paintCanvas,
        fileName: this.casConfig.name || '测试名称'
      })
    },
    /**
     * 图片上传
     */
    uploadClick() {
      const picture = this.paintCanvas.toDataURL('image/' + this.casConfig.type)
      this.upload && this.upload(this.dataURLtoBlob(picture))
    },
    /**
     * base64转文件流
     */
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    /**
     * 图片上传操作
     */
    upload(picture) {
      var paramsT = {
        bidId: this.mosaicData.bidId,
        imageId: this.mosaicData.id,
        fileName: this.casConfig.name + '.' + this.casConfig.type,
        fileType: this.mosaicData.filetype,
        useageType: this.mosaicData.useagetype,
        file: picture,
        fkApplyId: this.mosaicData.fkApplyId
      }
      console.log(paramsT)
      this.$ajax({
        method: 'post',
        url: '/subjectMatter/uploadMosaicImage',
        params: paramsT,
        success: data => {
          this.canvasCancel()
        }
      })
    },
    /**
     * 清空画布
     */
    clearCanvas() {
      this.cxt.clearRect(0, 0, this.paintCanvas.width, this.paintCanvas.height)
      this.$lib.cavPushImg({
        canvas: this.paintCanvas,
        url: this.casConfig.imgUrl
      })
    },
    /**
     * 关闭弹窗
     */
    canvasCancel() {
      this.$parent.$emit('mosaicPic')
      this.$refs.moasicControl.resetFields()
      this.cxt.clearRect(0, 0, this.paintCanvas.width, this.paintCanvas.height)
      this.$lib.removeEventListener(document, 'mouseup', this.documentMouseup)
    },
    /**
     * canvas的鼠标按下事件
     */
    canvasMousedown(e) {
      if (!this.casConfig.style) return
      const p = this.cxt
      const c = this.paintCanvas
      Object.assign(this.dottedOptions, this.getHeightAndWidth(e))
      this.$lib.addEventListener(
        this.paintCanvas,
        'mousemove',
        this.canvasMousemove
      )
      if (this.casConfig.style == 'drawLine') {
        this.drawLineDown(e)
      } else {
        this.drawDotted = true
      }
    },
    /**
     * canvas的鼠标移动事件
     */
    canvasMousemove(e) {
      if (this.drawDotted) {
        this.drawDottenMove(e)
      } else {
        this.drawLineMove(e)
      }
    },
    /**
     * document的键盘抬起事件
     */
    documentMouseup() {
      if (this.drawDotted) {
        const { x, y, w, h } = this.dottedOptions
        // this.drawMosaic(x, y, w, h)
        this[this.casConfig.style](x, y, w, h)
        this.clearDottedOptions()
        this.drawDotted = false
        this.clearDotted()
      }
      this.$lib.removeEventListener(
        this.paintCanvas,
        'mousemove',
        this.canvasMousemove
      )
    },
    /**
     * 画笔选择触发事件
     */
    drawLineDown(e) {
      const { x, y } = this.getHeightAndWidth(e)
      //设置画笔颜色和粗心
      this.cxt.strokeStyle = this.casConfig.color
      this.cxt.lineWidth = this.casConfig.penWidth
      // 每次重新开始
      this.cxt.beginPath()
      this.cxt.moveTo(x, y)
    },
    /**
     * 画笔选择触发事件
     */
    drawLineMove(e) {
      const { x, y } = this.getHeightAndWidth(e)
      // 每次重新开始
      this.cxt.lineTo(x, y)
      this.cxt.stroke()
    },
    /**
     * 画方块移动触发事件
     */
    drawDottenMove(e) {
      const { x, y } = this.dottedOptions
      const size = {
        w: this.getHeightAndWidth(e).x - x,
        h: this.getHeightAndWidth(e).y - y
      }
      Object.assign(this.dottedOptions, size)
      this.clearDotted()
      this.creatDotted()
    },
    /**
     * 空心方块选择出发事件
     */
    drawBlock(x, y, w, h) {
      //坐标点减去距离父元素之间的距离
      x = x - this.paintCanvas.offsetLeft
      y = y - this.paintCanvas.offsetTop
      this.cxt.strokeStyle = this.casConfig.color
      this.cxt.lineWidth = this.casConfig.penWidth
      this.cxt.strokeRect(x, y, w, h)
    },
    /**
     * 实心方块选择出发事件
     */
    drawSolidBlock(x, y, w, h) {
      //坐标点减去距离父元素之间的距离
      this.cxt.fillStyle = this.casConfig.color
      x = x - this.paintCanvas.offsetLeft
      y = y - this.paintCanvas.offsetTop
      this.cxt.fillRect(x, y, w, h)
    },
    /**
     * 马赛克小方块
     */
    drawMBlock(x, y, w, h) {
      x = x - this.paintCanvas.offsetLeft
      y = y - this.paintCanvas.offsetTop
      const n = this.casConfig.masaicLevel
      const xc = w / n
      const yc = h / n
      for (let i = 0; i < xc; i++) {
        for (let k = 0; k < yc; k++) {
          if ((i % 2 == 0 && k % 2 == 0) || (i % 2 != 0 && k % 2 != 0)) {
            this.cxt.fillStyle = this.casConfig.color1
          } else {
            this.cxt.fillStyle = this.casConfig.color2
          }
          // 如果剩余宽度不够一个方块的时候
          if (i == parseInt(xc) || k == parseInt(yc)) {
            this.cxt.fillRect(x + i * n, y + k * n, n * (xc - i), n * (yc - k))
          } else {
            this.cxt.fillRect(x + i * n, y + k * n, n, n)
          }
        }
      }

      // this.cxt.fillRect(x, y, w, h)
    },
    /**
     * 获取点击位置的坐标位置
     */
    getHeightAndWidth(e) {
      const modal = this.$refs.mosaicCanvasModal.$el
      this.byClassFind(modal, 'ivu-modal')
      const m = this.editCavsModalDom
      return {
        x: e.pageX - m.offsetLeft - this.canvasPart.offsetLeft,
        y: e.pageY - m.offsetTop - this.canvasPart.offsetTop
      }
    },
    /**
     * 设置dom的位置
     */
    byClassFind(dom, name) {
      for (var i = 0; i < dom.children.length; i++) {
        let nameArr = dom.children[i].className.split(' ')
        if (nameArr.indexOf(name) >= 0) {
          this.editCavsModalDom = dom.children[i]
          return dom.children[i]
        } else {
          this.byClassFind(dom.children[i], name)
        }
      }
    },
    /**
     *马赛克选择触发事件
     */
    drawMosaic(x, y, w, h) {
      //坐标点减去距离父元素之间的距离
      x = x - this.paintCanvas.offsetLeft
      y = y - this.paintCanvas.offsetTop
      // 宽度和高度不能为0，否则会报错
      w = w == 0 ? 1 : w
      h = h == 0 ? 1 : h
      var oImg = this.cxt.getImageData(x, y, w, h)
      console.log(oImg)
      var w = oImg.width
      var h = oImg.height
      //马赛克的程度，数字越大越模糊
      var num = this.casConfig.masaicLevel
      //等分画布
      var stepW = w / num
      var stepH = h / num
      //这里是循环画布的像素点
      for (var i = 0; i < stepH; i++) {
        for (var j = 0; j < stepW; j++) {
          //获取一个小方格的随机颜色，这是小方格的随机位置获取的
          var color = this.getXY(
            oImg,
            j * num + Math.floor(Math.random() * num),
            i * num + Math.floor(Math.random() * num)
          )
          //这里是循环小方格的像素点，
          for (var k = 0; k < num; k++) {
            for (var l = 0; l < num; l++) {
              //设置小方格的颜色
              this.setXY(oImg, j * num + l, i * num + k, color)
            }
          }
        }
      }
      this.cxt.putImageData(oImg, x, y)
    },
    /**
     * 清理dottedOptions坐标值
     */
    clearDottedOptions() {
      for (let k in this.dottedOptions) {
        this.dottedOptions[k] = 0
      }
    },
    // /**
    //  * 获取点击位置的坐标位置
    //  */
    // getHeightAndWidth(e) {
    //   const c = this.canvasPart
    //   return {
    //     x: e.clientX - c.offsetLeft,
    //     y: e.clientY - c.offsetTop
    //   }
    // },
    /**
     * 清理虚线框
     */
    clearDotted() {
      let bolockArea = this.$lib.getById('bolock-move-area')
      if (bolockArea) {
        this.canvasPart.removeChild(bolockArea)
      }
      return bolockArea
    },
    /**
     * 创建虚线框
     */
    creatDotted() {
      let bolockArea = this.$lib.creatEle({
        domType: 'div',
        idName: 'bolock-move-area'
      })
      this.$lib.eleSetStyle({
        dom: bolockArea,
        styles: {
          top: this.dottedOptions.y + 'px',
          left: this.dottedOptions.x + 'px',
          width: this.dottedOptions.w + 'px',
          height: this.dottedOptions.h + 'px'
        }
      })
      this.canvasPart.appendChild(bolockArea)
    },
    /**
     * 按照规则获取像素点
     */
    getXY(obj, x, y) {
      var w = obj.width
      var h = obj.height
      var d = obj.data
      var color = []
      color[0] = obj.data[4 * (y * w + x)]
      color[1] = obj.data[4 * (y * w + x) + 1]
      color[2] = obj.data[4 * (y * w + x) + 2]
      color[3] = obj.data[4 * (y * w + x) + 3]
      return color
    },
    /**
     * 按照规则设置像素点
     */
    setXY(obj, x, y, color) {
      var w = obj.width
      var h = obj.height
      var d = obj.data
      obj.data[4 * (y * w + x)] = color[0]
      obj.data[4 * (y * w + x) + 1] = color[1]
      obj.data[4 * (y * w + x) + 2] = color[2]
      obj.data[4 * (y * w + x) + 3] = color[3]
    },
    /**
     * canvas的鼠标滑过事件
     */
    canvasMouseover(e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang='less' scoped>
.p-mosaic {
  margin: 10px 0;
}
</style>


