(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: 2-Year Roadmap Gantt ---
  var c1 = echarts.init(document.getElementById('chart-roadmap'), null, { renderer: 'svg' });
  var categories = ['26.09-11', '26.12-27.01', '27.01-02', '27.03-06', '27.07-08', '27.09-28.01', '28.02-06'];
  var tasks = [
    { name: 'Think Starter 1-12', start: 0, end: 0, cat: 0, color: accent2 },
    { name: '语数英基础', start: 0, end: 1, cat: 0, color: accent },
    { name: '文言文入门', start: 0, end: 3, cat: 0, color: '#e8a838' },
    { name: 'Think 1 U1-6', start: 1, end: 1, cat: 1, color: accent2 },
    { name: '代数思维', start: 0, end: 3, cat: 0, color: '#5a8a7a' },
    { name: 'Think 1 U7-9', start: 2, end: 2, cat: 2, color: accent2 },
    { name: 'Think 1 U10-12', start: 3, end: 3, cat: 3, color: accent2 },
    { name: '英语词汇1500', start: 1, end: 4, cat: 1, color: '#c46a5a' },
    { name: '全等三角形', start: 3, end: 3, cat: 3, color: '#5a8a7a' },
    { name: 'Think 2 U1-6', start: 4, end: 4, cat: 4, color: accent2 },
    { name: '物理入门', start: 4, end: 5, cat: 4, color: '#8b6b9a' },
    { name: 'Think 2 U7-12', start: 5, end: 5, cat: 5, color: accent2 },
    { name: '一次函数', start: 5, end: 5, cat: 5, color: '#5a8a7a' },
    { name: '议论文阅读', start: 5, end: 6, cat: 5, color: '#e8a838' },
    { name: '中考词汇1800+', start: 5, end: 6, cat: 5, color: '#c46a5a' },
    { name: 'PET 备考冲刺', start: 6, end: 6, cat: 6, color: accent2 },
  ];
  var seriesData = [];
  tasks.forEach(function(t, i) {
    var startCat = t.cat;
    var endCat = t.cat;
    seriesData.push({
      name: t.name,
      value: [startCat, i, endCat, i, ''],
      itemStyle: { color: t.color }
    });
  });
  c1.setOption({
    tooltip: { formatter: function(p) { return p.name; }, appendToBody: true },
    animation: false,
    grid: { left: '22%', right: '4%', top: 10, bottom: 10 },
    xAxis: {
      type: 'category',
      data: categories,
      position: 'top',
      axisLabel: { color: ink, fontWeight: 600, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      splitArea: { show: false }
    },
    yAxis: {
      type: 'category',
      data: tasks.map(function(t) { return t.name; }),
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      splitArea: { show: false }
    },
    series: [{
      type: 'custom',
      renderItem: function(params, api) {
        var catIndex = api.value(0);
        var start = api.coord([catIndex, api.value(1)]);
        var end = api.coord([catIndex, api.value(2)]);
        var height = api.size([0, 1])[1] * 0.5;
        return {
          type: 'rect',
          shape: {
            x: start[0] + 4,
            y: start[1] - height / 2,
            width: end[0] - start[0] - 8,
            height: height
          },
          style: { fill: api.value(5) || accent, rx: 4, ry: 4 },
          textContent: {
            type: 'text',
            style: { text: '', fill: '#fff', fontSize: 10, fontWeight: 600 }
          }
        };
      },
      data: seriesData,
      encode: { x: [0, 2], y: [1, 3] }
    }]
  });
  window.addEventListener('resize', function() { c1.resize(); });

  // --- Chart 2: Subject Difficulty Radar ---
  var c2 = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  c2.setOption({
    tooltip: { trigger: 'item', appendToBody: true },
    animation: false,
    legend: {
      data: ['初一', '初二'],
      textStyle: { color: ink },
      bottom: 0
    },
    radar: {
      indicator: [
        { name: '语文', max: 5 },
        { name: '数学', max: 5 },
        { name: '英语', max: 5 },
        { name: '物理', max: 5 },
        { name: '道法', max: 5 },
        { name: '历史', max: 5 },
        { name: '地理', max: 5 },
        { name: '生物', max: 5 }
      ],
      center: ['50%', '48%'],
      radius: '62%',
      axisName: { color: ink, fontSize: 11 }
    },
    series: [{
      type: 'radar',
      areaStyle: { opacity: 0.15 },
      data: [
        {
          value: [2.5, 3.0, 2.5, 1.0, 2.0, 2.0, 2.0, 2.0],
          name: '初一',
          lineStyle: { color: accent },
          areaStyle: { color: accent, opacity: 0.15 },
          itemStyle: { color: accent }
        },
        {
          value: [3.0, 3.5, 3.0, 3.5, 2.5, 2.5, 2.0, 2.0],
          name: '初二',
          lineStyle: { color: accent2 },
          areaStyle: { color: accent2, opacity: 0.15 },
          itemStyle: { color: accent2 }
        }
      ]
    }]
  });
  window.addEventListener('resize', function() { c2.resize(); });

  // --- Chart 3: Think English Progress ---
  var c3 = echarts.init(document.getElementById('chart-think-progress'), null, { renderer: 'svg' });
  c3.setOption({
    tooltip: { trigger: 'axis', appendToBody: true },
    animation: false,
    grid: { left: '8%', right: '4%', bottom: '10%', top: '5%' },
    xAxis: {
      type: 'category',
      data: ['Starter\n3个月', 'Level 1\n7个月', 'Level 2\n8个月', 'PET备考\n2个月'],
      axisLabel: { color: ink, fontWeight: 600, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 35,
      name: '周数',
      nameTextStyle: { color: muted },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '已完成',
        type: 'bar',
        stack: 'total',
        barWidth: '50%',
        itemStyle: { borderRadius: [4, 4, 0, 0], color: accent },
        data: [0, 0, 0, 0]
      },
      {
        name: '计划中',
        type: 'bar',
        stack: 'total',
        barWidth: '50%',
        itemStyle: { borderRadius: [4, 4, 0, 0], color: accent + '40' },
        data: [12, 28, 32, 8],
        label: { show: true, position: 'inside', color: ink, fontSize: 11, fontWeight: 600 }
      }
    ]
  });
  window.addEventListener('resize', function() { c3.resize(); });

  // --- Chart 4: Daily Task Completion ---
  var c4 = echarts.init(document.getElementById('chart-daily'), null, { renderer: 'svg' });
  var days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var tasks2 = ['英语听力', '语文阅读', '错题整理'];
  var heatData = [];
  var sampleData = [[5, 5, 4, 5, 5, 3, 0], [5, 4, 5, 5, 4, 3, 0], [0, 5, 0, 5, 0, 5, 0]];
  tasks2.forEach(function(t, i) {
    days.forEach(function(d, j) {
      heatData.push([j, i, sampleData[i][j]]);
    });
  });
  c4.setOption({
    tooltip: {
      position: 'top',
      formatter: function(p) {
        return tasks2[p.value[1]] + ' · ' + days[p.value[0]] + '<br/>完成度: ' + ['', '未完成', '部分', '良好', '优秀', '满分'][p.value[2]];
      },
      appendToBody: true
    },
    animation: false,
    grid: { left: '10%', right: '4%', bottom: '12%', top: '5%' },
    xAxis: {
      type: 'category',
      data: days,
      splitArea: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'category',
      data: tasks2,
      splitArea: { show: false },
      axisLabel: { color: ink, fontWeight: 600, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } }
    },
    visualMap: {
      min: 0, max: 5,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: [bg2, '#f0d6b0', accent2 + '99', accent2, accent] },
      textStyle: { color: muted }
    },
    series: [{
      type: 'heatmap',
      data: heatData,
      label: {
        show: true,
        formatter: function(p) {
          return ['', '✗', '△', '○', '✓', '★'][p.value[2]];
        },
        color: ink,
        fontSize: 13
      },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' } }
    }]
  });
  window.addEventListener('resize', function() { c4.resize(); });

  // --- Chart 5: Zhongkao Score Distribution ---
  var c5 = echarts.init(document.getElementById('chart-zhongkao'), null, { renderer: 'svg' });
  c5.setOption({
    tooltip: { trigger: 'axis', appendToBody: true },
    animation: false,
    grid: { left: '3%', right: '4%', bottom: '12%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['语文', '数学', '英语', '物理', '道法', '体育'],
      axisLabel: { color: ink, fontWeight: 600 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '分',
      nameTextStyle: { color: muted },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [{
      type: 'bar',
      barWidth: '50%',
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: accent },
            { offset: 1, color: accent + '99' }
          ]
        }
      },
      data: [100, 100, 100, 80, 80, 80]
    }]
  });
  window.addEventListener('resize', function() { c5.resize(); });
})();