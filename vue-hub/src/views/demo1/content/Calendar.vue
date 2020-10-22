<template>
  <div class="width-100-per height-100-per layout-center">
      <!--    标题、上月、下月-->
      <div class="width-100-per layout-side" style="height: 10%;">
        <div class="cursor-pointer layout-center leftRightBtn" @click="prevMonth">&lt;</div>
        <div class="height-100-per layout-center-top" style="width: 40%;">
          <div class="layout-center timeTitle">
            <span style="font-weight: bold">{{`${newDate.split('-')[0]}年${newDate.split('-')[1]}月`}}</span>
          </div>
        </div>
        <div class="cursor-pointer layout-center leftRightBtn" @click="nextMonth">&gt;</div>
      </div>
      <!--    日期表-->
      <div class="width-100-per layout-left-top padding-10-px" style="height: calc(100% - 10%)">
        <!--      星期-->
        <div class="width-100-per layout-left-top" style="height: 10%">
          <div style="width: calc(100% / 7);" class="layout-center" v-for="(i,index) in weekArr" :key="index + i">{{i}}
          </div>
        </div>
        <!--      日期-->
        <div class="width-100-per layout-left-top" style="height: 90%">
          <template v-for="(i,index) in dateArr">
            <div class="layout-center tableCol" :style="{height: 'calc(100% / '+maxTableRow+')'}" :key="index"
                 :class="{'topBorderNone':index<7,'rightBorderNone':(index+8)%7===0}">
              <div :title="i" class="width-100-per height-100-per layout-center" :class="{'checked':i===thisDate}" style="cursor: default;position: relative">
                <span>{{i === '' ? '' : Number(i.split('-')[2])}}</span>
                <div v-if="showDayStatus(i)" class="checkBadge"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "Calendar",
    data() {
      return {
        thisDate: moment().format('YYYY-MM-DD'),//当前时间
        thisMonthDays: '',//当月天数
        thisDateWeek: '',//当月第一天是星期几
        newDate: '',//标题展示时间
        dateArr: [],//日期数组，有则填日期，无则填‘’
        weekArr: ['一', '二', '三', '四', '五', '六','七'],
        checkArr: [
          {
            checkinginTime: '2020-03-28',
            ip: '111'
          },
          {
            checkinginTime: '2020-03-27',
            ip: '111'
          },
          {
            checkinginTime: '2020-03-26',
            ip: '111'
          }
        ],//已经打过卡的数组，由后端返回，这里写死
        maxTableRow: 0,//列固定7列，这是当月最大行数
      }
    },
    computed: {
      //判断当天状态
      showDayStatus() {
        const that = this;
        return function (value) {
          if (!!value) {
            let flag = false;
            for (const ca of that.checkArr) {
              if ((ca.checkinginTime).indexOf(value) > -1) {
                flag = true
              }
            }
            return flag
          }
        }
      },
    },
    mounted() {
      this.calendarTable(this.thisDate);
    },
    methods: {
      //绘制日历表格
      calendarTable(date) {
        const that = this;
        that.dateArr = [];
        that.newDate = date;
        let yearMonthDay = that.newDate.split('-');
        //当月天数
        that.thisMonthDays = moment(date).daysInMonth();
        //当月一号是星期几
        that.thisDateWeek = moment(date).date(1).weekday();
        let calendarArr = [];
        //往日历数组装每天的日期
        for (let i = 1; i < that.thisMonthDays + 1; i++) {
          calendarArr.push(yearMonthDay[0] + '-' + yearMonthDay[1] + '-' + (i < 10 ? '0' + i : i))
        }
        // 有当月一号是星期几根据规则往前面补空位
        for (let j = 0; j < that.thisDateWeek; j++) {
          calendarArr.unshift('')
        }
        // 表格列数固定为7列，获取最大行数
        let len = calendarArr.length;
        let arrRow = Math.ceil(len / 7);
        that.maxTableRow = arrRow;
        // 获取整个表格的格子个数，给多余的格子补空
        for (let k = 0; k < arrRow * 7 - len; k++) {
          calendarArr.push('')
        }
        that.dateArr = calendarArr;
      },
      //上个月
      prevMonth() {
        const that = this;
        let date = moment(that.newDate).subtract(1, 'months').format('YYYY-MM-DD');
        that.calendarTable(date)
      },
      // 下个月
      nextMonth() {
        const that = this;
        let date = moment(that.newDate).add(1, 'months').format('YYYY-MM-DD');
        that.calendarTable(date)
      },
    }
  }
</script>

<style scoped>
  .timeTitle {
    margin-top: 1px;
    width: 100%;
    height: 100%;
    background: #FFCC38;
    color: black;
    transform: perspective(0.5rem) rotateX(-3deg)
  }

  .tableCol {
    width: calc(100% / 7);
    border-top: 1px dashed rgb(203, 201, 163);
    border-right: 1px dashed rgb(203, 201, 163)
  }

  .leftRightBtn {
    width: 10%;
    height: 100%;
  }

  .leftRightBtn:hover, .tableCol:hover {
    color: black;
    background: #FFCC38;
  }

  .checked {
    color: black;
    background: #FFCC38;
    cursor: pointer !important;
  }

  .checkBadge {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #52c41a;
    top: 0;
    right: 0;
    position: absolute
  }

  .topBorderNone {
    border-top: none !important;
  }

  .rightBorderNone {
    border-right: none !important;
  }
</style>