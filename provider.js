async function scheduleHtmlProvider() {
  function findTotalPages(htmlContent) {
    const $ = cheerio.load(htmlContent);
    let totalPages = 0;
    const pageInfo = $('#myPage p').text();
    const pagePattern = /共\s*(\d+)\s*页/;
    const match = pageInfo.match(pagePattern);
    if (match) {
      totalPages = parseInt(match[1], 10);
    }
    return totalPages;
  }

  const url = "https://sjjx.dean.swust.edu.cn/teachn/teachnAction/index.action";
  const res = await fetch(url, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
      "sec-fetch-dest": "iframe",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include"
  });

  let text = await res.text();  // 改为 let，支持后续 += 操作
  const totalPages = 3;

  if (totalPages === 1) {
    return text;
  } else {
    const url1 = "?page.pageNum=";
    const url2 = "&currTeachCourseCode=&currWeek=&currYearterm=2024-2025-1";

    for (let i = 2; i <= totalPages; i++) {
      const searchurl = url + url1 + i + url2;
      try{
      const res = await fetch(searchurl, {
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          "sec-fetch-dest": "iframe",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
        },
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include"
      });

      const pageText = await res.text();
      text += pageText; // 使用 let text
    }catch(e){
      console.alert(e);
    }
    }
    
    return text;
  }
}
