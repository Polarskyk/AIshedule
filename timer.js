async function scheduleTimer({
    providerRes,
    parserRes
  } = {}) {
    return {
      totalWeek: 20, // 总周数：[1, 30]之间的整数
      startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
      startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
      showWeekend: true, // 是否显示周末
      forenoon: 2, // 上午课程节数：[1, 10]之间的整数
      afternoon: 2, // 下午课程节数：[0, 10]之间的整数
      night: 2, // 晚间课程节数：[0, 10]之间的整数
      sections: [
      {
        section: 1, // 节次：[1, 30]之间的整数
        startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '09:40', // 结束时间：同上
      },
      {
        section: 2,
        startTime: '10:00',
        endTime: '11:40',
      },
      {
        section: 3,
        startTime: '14:00',
        endTime: '15:40',
      },
      {
        section: 4,
        startTime: '16:00',
        endTime: '17:40',
      },
      {
        section: 5,
        startTime: '19:00',
        endTime: '20:40',
      },
      {
        section: 6,
        startTime: '21:00',
        endTime: '22:40',
      },
    ], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
    // PS: 夏令时什么的还是让用户在夏令时的时候重新导入一遍吧，在这个函数里边适配吧！奥里给！————不愿意透露姓名的嘤某人
  }
