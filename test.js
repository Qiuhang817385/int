//原始数据
let obj = [
  {
    "Id": "1", "TitleName": "品牌",
    "Field": "AND TrademarkCode IN",
    "List": [
      { "Code": "01", "Name": "印象森林", "selected": true },
      { "Code": "02", "Name": "MM" },
      { "Code": "03", "Name": "YEUSOFT" },
      { "Code": "04", "Name": "KS" },
      { "Code": "05", "Name": "哈沐" }
    ]
  },
  {
    "Id": "2",
    "TitleName": "年份",
    "Field": "AND Years IN",
    "List":
      [{ "Code": "2021", "Name": "2021" },
      { "Code": "2020", "Name": "2020" },
      { "Code": "2019", "Name": "2019" },
      { "Code": "2018", "Name": "2018" },
      { "Code": "2017", "Name": "2017" },
      { "Code": "2016", "Name": "2016" },
      { "Code": "2015", "Name": "2015" },
      { "Code": "2013", "Name": "2013" }]
  },
  {
    "Id": "3", "TitleName": "季节", "Field": "AND Season IN",
    "List": [{ "Code": "1", "Name": "春" },
    { "Code": "2", "Name": "夏" },
    { "Code": "3", "Name": "秋" },
    { "Code": "4", "Name": "冬" },
    { "Code": "5", "Name": "通用" }]
  },
  {
    "Id": "4", "TitleName": "大类",
    "Field": "AND LEFT(TypeCode, 2) IN",
    "List": [
      { "Code": "01", "Name": "上装外套", "selected": true },
      { "Code": "02", "Name": "上装内搭" },
      { "Code": "03", "Name": "连身装" },
      { "Code": "04", "Name": "下装" },
      { "Code": "05", "Name": "饰品" },
      { "Code": "07", "Name": "点读笔" },
      { "Code": "11", "Name": "上衣" }]
  },
  {
    "Id": "5", "TitleName": "中类",
    "Field": "AND LEFT(TypeCode, 4) IN",
    "List":
      [{ "Code": "0101", "Name": "风衣" },
      { "Code": "0102", "Name": "棉衣" },
      { "Code": "0103", "Name": "外套" },
      { "Code": "0104", "Name": "大衣" },
      { "Code": "0105", "Name": "羽绒" },
      { "Code": "0106", "Name": "皮草" },
      { "Code": "0107", "Name": "背心" },
      { "Code": "0108", "Name": "皮革" },
      { "Code": "0201", "Name": "衬衫" },
      { "Code": "0202", "Name": "T恤" },
      { "Code": "0203", "Name": "背心" },
      { "Code": "0204", "Name": "卫衣" },
      { "Code": "0205", "Name": "毛衫" },
      { "Code": "0206", "Name": "针织衫" },
      { "Code": "0301", "Name": "连衣裙" },
      { "Code": "0302", "Name": "连体裤" },
      { "Code": "0303", "Name": "套装" },
      { "Code": "0401", "Name": "半裙" },
      { "Code": "0402", "Name": "牛仔裤" },
      { "Code": "0403", "Name": "裤子", "selected": true },
      { "Code": "0404", "Name": "针织裤" },
      { "Code": "0405", "Name": "打底裤" },
      { "Code": "0501", "Name": "配饰" },
      { "Code": "0502", "Name": "首饰" },
      { "Code": "0503", "Name": "其他" },
      { "Code": "0701", "Name": "易读宝" },
      { "Code": "1101", "Name": "上衣", "selected": true }]
  },
  {
    "Id": "6", "TitleName": "波段",
    "Field": "AND State  IN", "List":
      [{ "Code": "01A", "Name": "01A", "selected": true },
      { "Code": "01B", "Name": "01B", "selected": true },
      { "Code": "01C", "Name": "01C" },
      { "Code": "01D", "Name": "01D" },
      { "Code": "01E", "Name": "01A-1" },
      { "Code": "02A", "Name": "02A" },
      { "Code": "02B", "Name": "02B" },
      { "Code": "02C", "Name": "02C" },
      { "Code": "02D", "Name": "02D" },
      { "Code": "03A", "Name": "03A" },
      { "Code": "03B", "Name": "03B" },
      { "Code": "03C", "Name": "03C" },
      { "Code": "03D", "Name": "03D" },
      { "Code": "04A", "Name": "04A" },
      { "Code": "04B", "Name": "04B" },
      { "Code": "04C", "Name": "04C" },
      { "Code": "04D", "Name": "04D" },
      { "Code": "05A", "Name": "05A" },
      { "Code": "05B", "Name": "05B" },
      { "Code": "05C", "Name": "05C" },
      { "Code": "05D", "Name": "05D" },
      { "Code": "06A", "Name": "06A" },
      { "Code": "06B", "Name": "06B" },
      { "Code": "06C", "Name": "06C" },
      { "Code": "06D", "Name": "06D" },
      { "Code": "07A", "Name": "07A" },
      { "Code": "07B", "Name": "07B" },
      { "Code": "07C", "Name": "07C" },
      { "Code": "07D", "Name": "07D" },
      { "Code": "08A", "Name": "08A" },
      { "Code": "08B", "Name": "08B" },
      { "Code": "08C", "Name": "08C" },
      { "Code": "08D", "Name": "08D" },
      { "Code": "09A", "Name": "09A" },
      { "Code": "09B", "Name": "09B" },
      { "Code": "09C", "Name": "09C" },
      { "Code": "09D", "Name": "09D" },
      { "Code": "10A", "Name": "10A" },
      { "Code": "10B", "Name": "10B" },
      { "Code": "10C", "Name": "10C" },
      { "Code": "10D", "Name": "10D" },
      { "Code": "11A", "Name": "11A" },
      { "Code": "11B", "Name": "11B" },
      { "Code": "11C", "Name": "11C" },
      { "Code": "11D", "Name": "11D" },
      { "Code": "12A", "Name": "12A" },
      { "Code": "12B", "Name": "12B" },
      { "Code": "12C", "Name": "12C" },
      { "Code": "12D", "Name": "12D" }]
  },
  {
    "Id": "7", "TitleName": "主题",
    "Field": "AND Style IN", "List": [{}]
  }]
//期望结果
// AND TrademarkCode IN('01') 
// AND LEFT(TypeCode, 2) IN('01') 
// AND LEFT(TypeCode, 4) IN('0403', '1101') 
// AND State  IN('01A', '01B')


let newArr = [];

let str = ''
newArr = obj.filter((item) => {
  if (item.List) {
    let arr = []
    item.List.map(sol => {
      if (sol.hasOwnProperty('selected')) {
        arr.push(sol)
      }
    })
    if (arr.length) {
      str += item.Field;
      str += ' (';
      // ============================================================
      // 多字符串拼接处理最后一位
      arr.map((items) => {
        str += `'${items.Code}',`;
      })
      str = str.slice(0, str.length - 1);
      // ============================================================
      str += ") "
    }
  }
})


console.log(str);

// AND TrademarkCode IN('01')
// AND LEFT(TypeCode, 2) IN('01')
// AND LEFT(TypeCode, 4) IN('0403')
// AND LEFT(TypeCode, 4) IN('1101')
// AND State  IN('01A')
// AND State  IN('01B')


// ('01') AND TrademarkCode IN('01') 
// AND LEFT(TypeCode, 2) IN('0403') ('1101') 
// AND LEFT(TypeCode, 4) IN('01A') ('01B') 
// AND State  IN

// AND TrademarkCode IN('01' )
// AND LEFT(TypeCode, 2) IN('01' )
// AND LEFT(TypeCode, 4) IN('0403' '1101' )
// AND State  IN('01A' '01B' )