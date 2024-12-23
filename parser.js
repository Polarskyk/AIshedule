
function scheduleHtmlParser(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const courses = [];
  function time_jiexi(timeText) {
    const days = {
      "一": 1,
      "二": 2,
      "三": 3,
      "四": 4,
      "五": 5,
      "六": 6,
      "日": 7
    };
    return days[timeText] || 0;
  }
  function convertSections(start, end) {
    const sectionMap = {
      1: 1, 2: 1,
      3: 2, 4: 2,
      5: 3, 6: 3,
      7: 4, 8: 4,
      9: 5, 10: 5,
      11: 6, 12: 6,
      13: 7, 14: 7,
      15: 8, 16: 8
    };
    const sections = new Set();
    for (let i = start; i <= end; i++) {
      if (sectionMap[i]) {
        sections.add(sectionMap[i]);
      }
    }
    return Array.from(sections);
  }
  $('tr').each((index, element) => {
    const cols = $(element).find('td');
    if (cols.length >= 10) { // 确保行包含正确数量的列
      const name = $(cols[0]).text().trim();
      const position = $(cols[3]).text().trim();
      const teacher = $(cols[4]).text().trim();
      const timeText = $(cols[2]).text().trim();

      // 解析时间信息
      const timePattern = /(\d+)周星期([一二三四五六日])(\d+)-(\d+)节/;
      const match = timeText.match(timePattern);
      let weeks = [], day = 0, sections = [];
      if (match) {
        weeks = [parseInt(match[1])];
        day = parseInt(time_jiexi(match[2]));
        sections = convertSections(parseInt(match[3]), parseInt(match[4]));
        
      }

      const course = {
        name,
        position,
        teacher,
        weeks,
        day,
        sections
      };
      courses.push(course);
    }
  });

  console.log(courses);
  return courses;
}

