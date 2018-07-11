<template>
  <div>
    <div class="calendar-mask">
      <div class="calendar-header">
        <div class="calendar-header-title clearfix">
          <div class="fl calendar-close" @click="$emit('closeCalendar')">取消</div>
          <div class="fr calendar-sure" @click="setDate">确定</div>
          租用时间
        </div>
        <ul class="calendar-week-list clearfix">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
      </div>
      <div class="calendar-main">
        <template v-for="(datObj,index) in dates">
          <ul class="calendar-month-list clearfix" :class="[index == 0 ? 'first-month-list' : 'other-month-list']">
            <li>
              <span v-if="getDay(datObj.year,datObj.month) === 0" class="month-content">{{datObj.month}}月</span>
            </li>
            <li>
              <span v-if="getDay(datObj.year,datObj.month) === 1" class="month-content">{{datObj.month}}月</span>
            </li>
            <li>
              <span v-if="getDay(datObj.year,datObj.month) === 2" class="month-content">{{datObj.month}}月</span>
            </li>
            <li>
              <span v-if="getDay(datObj.year,datObj.month) === 3" class="month-content">{{datObj.month}}月</span>
            </li>
            <li>
              <span v-if="getDay(datObj.year,datObj.month) === 4" class="month-content">{{datObj.month}}月</span>
            </li>
            <li>
              <span v-if="getDay(datObj.year,datObj.month) === 5" class="month-content">{{datObj.month}}月</span>
            </li>
            <li>
              <span v-if="getDay(datObj.year,datObj.month) === 6" class="month-content">{{datObj.month}}月</span>
            </li>
          </ul>
          <ul class="calendar-day clearfix">
            <li v-for="day in datObj.days" :key="day.id" :class="[(day.ymd>startDate&&day.ymd<endDate)?'secDate':'',startDate === day.ymd?'start-date':'',endDate === day.ymd?'end-date':'']"
              @click="seclect(day)">
              <span :class="[{'colbbb':day.beforeNowFlag}]">{{day.name}}</span>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <transition name="slide-fade-error">
      <div class="error-mask" v-if="errorFlag" @click="closeError">
        <div class="error-box">
          <p class="rent-mindays">
            <span>{{originalMinDays}}天</span>
            <span>起租</span>
          </p>
          <p class="rent-info">{{errorDaysTips}}</p>
          <p class="close-count-down">{{countDownTimes}}s</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      originalStartDate: '',
      originalEndDate: '',
      originalMinDays: '' // 最小天数，  props
    },
    data() {
      return {
        timer: null,
        errorFlag: false,
        countDownTimes: 3,
        currentDate: '', // 今天
        dates: [],
        startDate: '',
        endDate: '',
        mindays: '',
        maxdays: 99,
        errorDaysTips: ''
      }
    },
    mounted() {
      let self = this
      this.startDate = this.originalStartDate
      this.endDate = this.originalEndDate
      this.mindays = this.originalMinDays
      let d = new Date()
      this.currentDate = d.getFullYear() + '-' + this.zero(d.getMonth() + 1) + '-' + this.zero(d.getDate())
      this.dates = this.loopCreate()
      this.dates.map((item, index) => {
        self.dates[index].days = this.render(this.dates[index].year, this.dates[index].month)
      })
    },
    methods: {
      // 渲染日期
      render(y, m) {
        let firstDayOfMonth = new Date(y, m - 1, 1).getDay()// 当月的第一天星期几
        let lastDateOfMonth = new Date(y, m, 0).getDate()// 当月最后一天多少号，即这个月有多少天
        let temp = []

        for (let i = 0; i < firstDayOfMonth; i++) {
          temp.push({})
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
          let day = {}
          day.name = i
          day.nameCopy = i
          day.ymd = y + '-' + this.zero(m) + '-' + this.zero(i)
          day.beforeNowFlag = false

          if (this.currentDate === day.ymd) {
            day.name = '今天'
            day.nameCopy = '今天'
          } else if (this.currentDate > day.ymd) {
            day.beforeNowFlag = true
          }
          temp.push(day)
        }
        return temp
      },
      getDay(year, month) {
        return new Date(year, month - 1).getDay()
      },
      zero(d) {
        return d < 10 ? '0' + d : d
      },
      // 循环6个月
      loopCreate() {
        let d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth()
        let dates = []
        for (let i = 0; i < 6; i++) {
          month++
          if (month === 13) {
            month = 1
            year++
          }
          dates.push({ year: year, month: month })
        }
        return dates
      },
      // 选择日期
      seclect(day) {
        if (day.beforeNowFlag) return
        if (!this.startDate && !this.endDate) {
          day.name = '开始'
          this.startDate = day.ymd
        } else if (this.startDate && !this.endDate) {
          if (this.startDate > day.ymd) {
            this.clearName()
            day.name = '开始'
            this.startDate = day.ymd
            day.startDateFlag = true
          } else {
            let minDaysFlag = this.checkDifferDays(day.ymd)
            if (minDaysFlag === false) {
              this.errorFlag = true
              this.countDown()
              return
            }
            this.clearName()
            this.endDate = day.ymd
          }
        } else if (this.startDate && this.endDate) {
          this.clearName()
          this.startDate = this.endDate = ''
          day.name = '开始'
          this.startDate = day.ymd
        }
      },
      // 判断选择的日期是否大于开始日期加上最小天数
      checkDifferDays(nowDate) {
        let differDays = (new Date(nowDate).getTime() - new Date(this.startDate).getTime()) / 86400000 + 1
        if (differDays < this.mindays) {
          this.errorDaysTips = `至少选择${this.originalMinDays}天或${this.originalMinDays}天以上`
          // this.startDate = ''
          // this.clearName()
          return false
        } else if (differDays > this.maxdays) {
          this.errorDaysTips = `最多选择${this.maxdays}天`
          return false
        } else {
          return true
        }
      },
      // 清除样式
      clearName() {
        this.dates.map((item, index) => {
          item.days.map((day, j) => {
            day.name = day.nameCopy
          })
        })
      },
      closeError() {
        clearTimeout(this.timer)
        this.errorFlag = false
        this.countDownTimes = 3
      },
      // 倒计时
      countDown() {
        let self = this
        self.timer = setTimeout(() => {
          self.countDownTimes--
          if (self.countDownTimes < 1) {
            clearTimeout(self.timer)
            self.errorFlag = false
            self.countDownTimes = 3
            return
          }
          self.countDown()
        }, 1000)
      },
      setDate() {
        if (this.startDate && this.endDate) {
          this.$emit('setDate', this.startDate, this.endDate)
          this.$emit('closeCalendar')
        }
      }
    }
  }
</script>