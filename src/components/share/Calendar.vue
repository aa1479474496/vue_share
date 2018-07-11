<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title">calendar</h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-lg-6">
          <div class="input-group" @click="calendar.flag = true">
            <input type="text" onfocus="this.blur()" class="form-control" placeholder="选择时间">
          </div>
          <div>{{rentDate}}</div>
        </div>
      </div>
    </div>
    <default-calendar v-if="calendar.flag" :originalStartDate="calendar.startDate" :originalEndDate="calendar.endDate"
      :originalMinDays="calendar.minDate" @setDate="setDate" @closeCalendar="closeCalendar">
    </default-calendar>
  
  </div>
</template>

<script>
  import DefaultCalendar from '@/components/common/DefaultCalendar.vue'
  export default {
    components: {
      DefaultCalendar
    },
    data() {
      return {
        mindays: null,
        calendar: {
          flag: false,
          startDate: '',
          endDate: '',
          minDate: 3
        },
        rentDate: ''
      }
    },
    methods: {
      setDate(startDate, endDate) {
        this.calendar.startDate = startDate
        this.calendar.endDate = endDate
        this.days = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1 + '天'
        this.rentDate = `${this.getMonth(startDate)}月${this.getDate(startDate)}日/${this.getMonth(endDate)}月${this.getDate(endDate)}日`
      },
      zero(d) {
        return d < 10 ? '0' + d : d
      },
      getMonth(date) {
        return this.zero(new Date(date).getMonth() + 1)
      },
      getDate(date) {
        return this.zero(new Date(date).getDate())
      },
      closeCalendar() {
        this.calendar.flag = false
      },
    }
  }
</script>