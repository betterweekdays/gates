//reusable vue component for bar chart
Vue.component('bar-chart', {
  props: ['d3Data','d3Offset', 'd3Des', 'chartid', 'chartWidth', 'chartHeight', 'd3Translate','d3TranslateHor','tooltipTopMargin','tooltipLeftMargin','tooltipWidth','tooltipHeight','d3Color','tooltipid','tooltipsrc','boxid'],
  template:`
    <div>
      <svg :id="chartid" :width="chartWidth" :height="chartHeight"></svg>
      <div id="tooltip" class="hidden">
          <p><strong><span id="title"></span></strong></p>
          <p><span id="value"></span>%</p>
          <p><span id="text"></span></p>
      </div>
      <div :id="boxid">
        <img :id="tooltipid" :src="tooltipsrc">
      </div>
    </div>
  `,
  watch: {
    d3Data(){
      var that = this;
      that.appendAxis();
      that.tooltip(that.appendBars());
      that.appendLabels();
    }
  },
  methods:{
    prepareScales: function(){
      var that = this;
      var grid = d3.range(25).map(function(i){
                                    return {'x1':0, 'y1':0, 'x2':0, 'y2':that.d3TranslateHor};
      });
      var tickVals = grid.map(function(d, i){
                                if (i>0){
                                  return i*10;
                                } else if (i==0){
                                  return "100";
                                }
      });
      var xScale = d3.scaleLinear()
                      .domain([0, d3.max(that.d3Data, function(d) { return d.percent; })+5])
                      .range([0, (that.chartWidth-that.d3Offset)-200]);
      var yScale = d3.scaleBand()
                      .domain(d3.range(0, 9))
                      .range([0, that.chartHeight/1.15]);
      return {xScale, yScale, tickVals};
    },
    prepareAxis: function(){
      var that = this;
      var getScales = that.prepareScales();
      var xAxis = d3.axisBottom()
                    .scale(getScales.xScale)
                    .tickValues(getScales.tickVals);
      var yAxis = d3.axisLeft()
                    .scale(getScales.yScale)
                    .tickSize(2)
                    .tickFormat(function(d, i){
                                  return that.d3Data[i].name;
                    })
                    .tickValues(d3.range(9));
      return {xAxis, yAxis};
    },
    checkDup: function(svg){
      if (!svg.selectAll("*").empty()){
        svg.selectAll("*").remove();
      }
    },
    appendAxis: function(){
      var that = this;
      var svg = d3.select("#"+that.chartid);
      that.checkDup(svg);
      var getAxis = that.prepareAxis();
      var xx = svg.append("g")
                    .attr("transform", "translate("+that.d3Translate+", "+that.d3TranslateHor+")")
                    .attr("id", "xaxis")
                    .call(getAxis.xAxis);
      var yx = svg.append("g")
                    .attr("transform", "translate("+that.d3Translate+", 0)")
                    .attr("id", "yaxis")
                    .call(getAxis.yAxis);
    },
    appendBars: function(){
      var that = this;
      // var color = ["#b50804","#eaa612","#85860f","#83bcc3","#3e4079"];
      // var colorFunction = d3.scaleOrdinal(color);
      // console.log(that.d3Color[3])
      // console.log(that.d3Color)
      var getScales = that.prepareScales();
      var svg = d3.select("#"+that.chartid);
      var bars = svg.append("g")
            .attr("transform", "translate("+that.d3Translate+", 0)")
            .attr("id","bars")
            .attr("class", "bar")
            .selectAll("rect")
            .data(that.d3Data)
            .enter()
            .append("rect")
            .attr("width", function(d){
                              return getScales.xScale(d.percent);
            })
            .attr("height", that.chartHeight/17.2)
            .attr("x", 1)
            .attr("y", function(d,i){
                return getScales.yScale(i)+that.chartHeight/45.8; })
            .attr("fill", (d,i)=>that.d3Color[i])
      return bars;
    },
    tooltip: function(bars){
      var that = this;
      var getScales = that.prepareScales();
      bars.on("mouseover", function(d,i){
                  // console.log("i: "+i)
                  var tt = d3.select("#tooltip")
                            .style("width", that.tooltipWidth+"px")
                            .style("height", that.tooltipHeight+"px")
                            .style("left", that.tooltipLeftMargin+"px")
                            // .style("left", getScales.xScale(d.percent)+400+"px")
                            .style("top", that.tooltipTopMargin+"px")
                            // .style("top", that.d3Offset+1800+getScales.yScale(i)+"px");
                            .style("background-color", that.d3Color[i]);
                  // console.log("that.d3Color[i]: "+that.d3Color[i])
                  tt.select("#value")
                    .text(d.percent);
                  tt.select("#title")
                    .text(d.name);
                  tt.select("#text")
                    .text(function() {
                            for (a = 0; a < that.d3Des.length; a++) {
                              if (that.d3Des[a].name == d.name){
                                return that.d3Des[a].dx;
                              }
                            }
                            return "No pre-set description found"; });

                  d3.select("#tooltip").classed("hidden", false);
          })
          .on("mouseout", function(){
                  d3.select("#tooltip").classed("hidden", true);
          });
    },
    appendLabels: function(){
      var that = this;
      var svg = d3.select("#"+that.chartid);
      var getScales = that.prepareScales();
      svg.append("g")
        .attr("id", "label");
      var label = svg.select("#bars")
                      .selectAll("text")
                      .data(that.d3Data)
                      .enter()
                      .append("text")
                      .text(function(d){
                        return d.percent+"%";
                      })
                      .attr("y", function(d,i){
                        return getScales.yScale(i)+that.chartHeight/17.2;
                      })
                      .attr("x", function(d){
                        return getScales.xScale(d.percent)+10;
                      })
                      .attr("fill", (d,i)=>that.d3Color[i]);
    }
  }
})

function produceLink(that){
  // if (that.vueSchool.constructor === Array) that.vueSchool.sort();
  // if (that.vueProgram.constructor === Array) that.vueProgram.sort();
  // if (that.vueRace.constructor === Array) that.vueRace.sort();
  //
  var prelink = "https://betterweekdays.github.io/gates/data/";
  //
  // for (i=0; i<that.vueSchool.length;i++){
  //   prelink = prelink + "school=" + that.vueSchool[i]+"&"
  // }
  //
  // for (i=0; i<that.vueProgram.length;i++){
  //   prelink = prelink + "program=" + that.vueProgram[i]+"&"
  // }
  //
  // for (i=0; i<that.vueRace.length;i++){
  //   prelink = prelink + "race=" + that.vueRace[i]+"&"
  // }

  if (that.vueInstitution) prelink = prelink + "institution=" + that.vueInstitution+"&"
  // if (that.vueGender) prelink = prelink + "gender=" + that.vueGender+"&"
  // if (that.vueIncome) prelink = prelink + "income=" + that.vueIncome+"&"
  // if (that.vueFirst) prelink = prelink + "first=" + that.vueFirst+"&"
  // if (that.vueAttendance) prelink = prelink + "attendance=" + that.vueAttendance+"&"
  var link = prelink.substring(0, prelink.length-1)+".json"
  //for testing purpose
  if (link !== "https://betterweekdays.github.io/gates/data/school=A&program=B&race=C&gender=A&income=B&first=C&attendance=A.json" && link !== "https://betterweekdays.github.io/gates/data/school=B&program=B&race=C&gender=C&income=A&first=A&attendance=A.json"){
    link = "https://betterweekdays.github.io/gates/data/testdata.json";
  }
  console.log(link)
  return link;
}

//customized info for dominant value (dv) dvDescription taken from JobScript sample report
var dvDescription = [
      {"name":"Motivational Energy","dx":"Individual has tremendous enthusiasm and motivation to share excitement with others, often gets people to enjoy the moment."},
      {"name":"Strategic Decisions","dx":"Individual’s capacity to see the big picture and develop logical and effective strategies positions them to manage and advise."},
      {"name":"Entrepreneurial Challenge","dx":"Individual is motivated by excitement and competition, entrepreneurial and challenging circumstances."},
      {"name":"Natural Appreciation","dx":"Individual is a keen observer of life who wants to ensure the natural order is respected and maintained."},
      {"name":"Production Efficiency","dx":"Individual is action-oriented and motivated by hard work and determination to get things done, the classic “doer” who can be counted on."},
      {"name":"Artistic Creativity","dx":"Individual has a desire to be creative, has insight and an artistic nature leading to innovative designs, products and works of art."},
      {"name":"Human Development","dx":"Individual is compassionate and service oriented, responds to the developmental needs of those around them."},
      {"name":"Societal Change","dx":"Individual cares about things that affect society and wants to work to effect change and influence opinions toward the common good."},
      {"name":"Theoretical Discovery","dx":"Individual seeks out underlying reasons things happen and likes to investigate and solve complex problems."}];

var dvVue = new Vue({
  el: '#dv',
  data(){
    return{
      chartid:"dv-chart",
      chartWidth:800,
      chartHeight:450,
      d3Translate:170,
      d3TranslateHor:390,
      d3Data: {},
      vueInstitution:"",
      vueSchool:[],
      vueProgram:[],
      vueRace:[],
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      d3Offset:0,
      d3Des: dvDescription,
      tooltipLeftMargin:1170,
      tooltipTopMargin:1025,
      tooltipWidth:225,
      tooltipHeight:350,
      d3Color: ["#505160","#5c6a7f","#68829e","#7a9185","#8ba06b","#9daf52","#aebd38","#84a036","#598234"],
      tooltipid:"dv-tooltip",
      tooltipsrc:"img/overview.png",
      boxid:"dv-box"
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("dvVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("dvVue created")
    this.fetchData();
  },
  // mounted: function(){
  //   console.log("dvVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("dvVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Dominant Values"]
          })
    }
  }
})

//customized vue instance for key strength (ks)
var ksDescription = [
  {"name":"Accomplishment-oriented","dx":"KKKKKThis should be description for accomplishment-oriented"},
  {"name":"Kind-hearted","dx":"SSSSSSdes1"},
  {"name":"Change-oriented","dx":"KSKSKSKSdes2"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var ksVue = new Vue({
  el: '#ks',
  data(){
    return{
      chartid:"ks-chart",
      chartWidth:1500,
      chartHeight:350,
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      d3Data: {},
      d3Offset:750,
      d3Des: ksDescription,
      d3Translate:800,
      d3TranslateHor:305,
      tooltipWidth:300,
      tooltipHeight:275,
      tooltipTopMargin:1850,
      tooltipLeftMargin:375,
      d3Color: ["#003B46","#044951","#07575B","#176469","#377E84","#56989F","#66A5AD","#95C2CA","#C4DFE6"],
      tooltipid:"ks-tooltip",
      tooltipsrc:"img/keystrength.png",
      boxid:"ks-box"
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("ksVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("ksVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("ksVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("ksVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Key Strengths"]
          })
    }
  }
})

//customized vue instance for caution areas (ca)
var caDescription = [
  {"name":"Accomplishment-oriented","dx":"caution area"},
  {"name":"Kind-hearted","dx":"ccccccca"},
  {"name":"Change-oriented","dx":"caaaaaaaa"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var caVue = new Vue({
  el: '#ca',
  data(){
    return{
      chartid:"ca-chart",
      chartWidth:830,
      chartHeight:350,
      d3Data: {},
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      d3Offset:0,
      d3Des: caDescription,
      d3Translate:240,
      d3TranslateHor:305,
      tooltipWidth:220,
      tooltipHeight:275,
      tooltipTopMargin:2255,
      tooltipLeftMargin:1200,
      d3Color: ["#1995ad","#46abbf","#74c0d0","#a1d6e2","#aacdd6","#b3c3ca","#b8bfc4","#bcbabe","#d7d6d8"],
      tooltipid:"ca-tooltip",
      tooltipsrc:"img/cautionareas.png",
      boxid:"ca-box"
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("caVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("caVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("caVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("caVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Caution Areas"]
          })
    }
  }
})

//reusable vue compoenent for donut chart
Vue.component('donut-chart', {
  props: ['d3Data', 'd3Des', 'chartid','innerRadius', 'outerRadius', 'move','d3Color'],
  template:`
    <div>
      <svg class="pie" width="400" height="400" :transform="move">
        <g :id="chartid" transform="translate(200,200)"></g>
      </svg>
    </div>
  `,
  watch:{
    d3Data(){
      var that = this;
      that.appendPath();
    }
  },
  methods:{
    prepareElements: function(){
      var that = this;
      // var color = d3.scaleOrdinal(d3.schemeBlues[9]);
      // console.log(color)

      var arc = d3.arc()
                  .innerRadius(that.innerRadius) //radius-thickness
                  .outerRadius(that.outerRadius); //radius

      var pie = d3.pie()
                  .value(function(d) { return d.percent; })
                  .sort(null);

      // return {color, arc, pie};
      return {arc, pie}
    },
    checkDup: function(element){
      if (!element.selectAll("*").empty()){
        element.selectAll("*").remove();
      }
    },
    appendPath: function(){
      var that = this;
      var elements = that.prepareElements();
      var pie = elements.pie;
      // var color = elements.color;
      var arc = elements.arc;
      var gout = d3.select("#"+that.chartid);
      that.checkDup(gout);

      var path = gout.selectAll('path')
                  .data(pie(that.d3Data))
                  .enter()
                  .append("g")
                  .on("mouseover", function(d,i) {
                        let g = d3.select(this)
                                  .style("cursor", "pointer")
                                  .style("fill", "#66ccff")
                                  .append("g")
                                  .attr("class", "text-group");

                        g.append("text")
                          .attr("class", "name-text")
                          .text(d.data.name)
                          .attr('text-anchor', 'middle')
                          .attr('dy', '-1.2em');

                        g.append("text")
                          .attr("class", "value-text")
                          .text(d.data.percent+"%")
                          .attr('text-anchor', 'middle')
                          .attr('dy', '.6em');

                        g.append("text")
                          .attr("class", "description-text")
                          .text(function() {
                                  for (a = 0; a < that.d3Des.length; a++) {
                                    // console.log("a: "+a)
                                    // console.log("that.d3Des[a].name: "+that.d3Des[a].name)
                                    // if (a==0){console.log(d.data.name);}
                                    // console.log("d.name: "+d.name)
                                    // console.log("that.d3Des[a].dx: "+that.d3Des[a].dx)
                                    if (that.d3Des[a].name == d.data.name){
                                      return that.d3Des[a].dx;
                                    }
                                  }
                                  return "No pre-set description found"; })
                          .attr('text-anchor', 'middle')
                          .attr('dy', '1.8em');
                    })
              .on("mouseout", function(d) {
                                  d3.select(this)
                                    .style("cursor", "none")
                                    .style("fill", that.d3Color[this._current])
                                    .select(".text-group").remove();
                              })
              .append('path')
              .attr('d', arc)
              .attr('fill', (d,i) => that.d3Color[i])
              .on("mouseover", function(d) {
                  d3.select(this)
                    .style("cursor", "pointer")
                    .style("fill", "#66ccff");
                })
              .on("mouseout", function(d) {
                  d3.select(this)
                    .style("cursor", "none")
                    .style("fill", that.d3Color[this._current]);
                })
              .each(function(d, i) { this._current = i; });

          var text = "";
          gout.append('text')
              .attr('text-anchor', 'middle')
              .attr('dy', '.35em')
              .text(text);
    }
  }
})

//customized vue instance for job functions (jf)
var jfdescription = [
    {"name":"Creating","dx":"Developing; Designing; Inventing"},
    {"name":"Marketing","dx":"Selling; Networking; Deal-making"},
    {"name":"Strategizing","dx":"Integrating; Problem-Solving; Advising"},
    {"name":"test1","dx":"des"},
    {"name":"test2","dx":"des"},
    {"name":"test3","dx":"des"},
    {"name":"test4","dx":"des"},
    {"name":"test5","dx":"des"},
    {"name":"test6","dx":"des"}];

var jfVue = new Vue({
  el: '#jf',
  data(){
    return{
      d3Data: {},
      d3Des: jfdescription,
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "jf-chart",
      innerRadius:150,
      outerRadius:200,
      move:"translate(-150,0)",
      d3Color:["#afbf7c","#f4cc70","#e9a349","#de7a22","#7f8757","#209488","#399e8a","#51a788","#6ab187"]
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("jfVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("jfVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("jfVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("jfVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Job Functions"]
          })
    }
  }
})

//customized vue instance for model role (mr)
// var mrDescription = [
//   {"name":"Alice","dx":"Description for Alice"},
//   {"name":"Ben","dx":"Description for Ben"},
//   {"name":"Cici","dx":"Description for Cici"},
//   {"name":"Dave","dx":"Description for Dave"},
//   {"name":"Eva","dx":"Description for Eva"},
//   {"name":"Frank","dx":"Description for Frank"},
//   {"name":"Gigi","dx":"Description for Gigi"},
//   {"name":"Helen","dx":"Description for Helen"},
//   {"name":"Iris","dx":"Description for Iris"}];
//
// var mrVue = new Vue({
//   el: '#mr',
//   data(){
//     return{
//       chartid:"mr-chart",
//       chartWidth:900,
//       chartHeight:550,
//       d3Data: {},
//       d3Offset:3250,
//       vueSchool:"",
//       vueProgram:"",
//       vueRace:"",
//       vueGender:"",
//       vueIncome:"",
//       vueFirst:"",
//       vueAttendance:"",
//       d3Des: mrDescription,
//       d3Translate:150,
//       d3TranslateHor:480,
//       tooltipWidth:350,
//       tooltipHeight:400,
//       tooltipTopMargin:2525,
//       tooltipLeftMargin:400
//     }
//   },
//   computed:{
//     isChanged(){
//       return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
//     }
//   },
//   watch: {
//     isChanged() {
//       // console.log("mrVue watch")
//       this.fetchData();
//     }
//   },
//   created: function(){
//     // console.log("mrVue created")
//     this.fetchData();
//   },
//   // mounted: function(){
//     // console.log("mrVue mounted")
//   // },
//   methods: {
//     fetchData: function(){
//       // console.log("mrVue methods fetchData")
//       var link = window.produceLink(this);
//       fetch(link)
//           .then(response => response.json())
//           .then(json => {
//             this.d3Data = json.data["0"]["Model Roles"]
//           })
//     }
//   }
// })

//customized vue instance for job functions (jf)
var rpdescription = [
  {"name":"Accomplishment-oriented","dx":"roles & positions"},
  {"name":"Kind-hearted","dx":"roles & positions"},
  {"name":"Change-oriented","dx":"roles & positions"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var rpVue = new Vue({
    el: '#rp',
    data(){
      return{
        d3Data: {},
        d3Des: rpdescription,
        vueInstitution:"",
        vueSchool:"",
        vueProgram:"",
        vueRace:"",
        vueGender:"",
        vueIncome:"",
        vueFirst:"",
        vueAttendance:"",
        chartid: "rp-chart",
        innerRadius:150,
        outerRadius:200,
        move:"translate(400,0)",
        d3Color:["#afbf7c","#f4cc70","#e9a349","#de7a22","#7f8757","#209488","#399e8a","#51a788","#6ab187"]
      }
    },
    computed:{
      isChanged(){
        return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
      }
    },
    watch: {
      isChanged() {
        // console.log("rpVue watch")
        this.fetchData();
      }
    },
    created: function(){
      // console.log("rpVue created")
      this.fetchData();
    },
    // mounted: function(){
      // console.log("rpVue mounted")
    // },
    methods: {
      fetchData: function(){
        // console.log("rpVue methods fetchData")
        var link = window.produceLink(this);
        fetch(link)
            .then(response => response.json())
            .then(json => {
              this.d3Data = json.data["0"]["Role Positions"]
            })
      }
    }
  })

//reusable vue compoenent for filled donut chart
Vue.component('filled-donut-chart', {
  props: ['d3Data', 'd3Des', 'chartid','innerRadius', 'outerRadius', 'move','d3Color', 'd3Offset','d3OffsetHor'],
  delimiters:["<%","%>"],
  template:`
    <div>
      <svg class="pie" width="280" height="280" :transform="move">
        <g :id="chartid" transform="translate(140,140)"></g>
      </svg>
      <div id="dooldip"  class="hidden">
        <p id="dooldipname"></p>
        <p id="dooldippercent"></p>
      </div>
    </div>
  `,
  watch:{
    d3Data(){
      var that = this;
      that.appendTooltip(that.appendPath());
    }
  },
  methods:{
    prepareElements: function(){
      var that = this;
      // var color = d3.scaleOrdinal(d3.schemeBlues[9]);
      // console.log(color)

      var arc = d3.arc()
                  .innerRadius(that.innerRadius) //radius-thickness
                  .outerRadius(that.outerRadius); //radius

      var pie = d3.pie()
                  .value(function(d) { return d.percent; })
                  .sort(null);

      // return {color, arc, pie};
      return {arc, pie}
    },
    checkDup: function(element){
      if (!element.selectAll("*").empty()){
        element.selectAll("*").remove();
      }
    },
    appendPath: function(){
      var that = this;
      var elements = that.prepareElements();
      var pie = elements.pie;
      // var color = elements.color;
      var arc = elements.arc;
      var gout = d3.select("#"+that.chartid);
      that.checkDup(gout);

      var path = gout.selectAll('path')
                  .data(pie(that.d3Data))
                  .enter()
                  .append("g")
                  // .on("mouseover", function(d,i) {
                  //       let g = d3.select(this)
                  //                 .style("cursor", "pointer")
                  //                 // .style("fill", "#66ccff")
                  //                 .append("g")
                  //                 .attr("class", "text-group");
                  //
                  //       // var textbox = g.append("div")
                  //       //                 .attr("id","test")
                  //       //                 .attr("width", 200)
                  //       //                 .attr("height", 200)
                  //
                  //       // g.append("circle")
                  //       //   .attr("class","donut-circle")
                  //       //   .attr("r",100)
                  //       //   .attr("fill",that.d3Color[i])
                  //       //
                  //       // var circletextarray = [];
                  //       // if (d.data.name.includes('/')||d.data.name.includes('&')||d.data.name.includes(' ')){
                  //       //   circletextarray = d.data.name.split(/[\s/&]+/);
                  //       //   // circletextarray = d.data.name.split(" ");
                  //       // } else {
                  //       //   circletextarray.push(d.data.name);
                  //       // }
                  //       // // console.log(circletextarray)
                  //       //
                  //       // for (i=0; i<circletextarray.length; i++){
                  //       //   g.append("text")
                  //       //     .attr("class", "filled-name-text")
                  //       //     .text(circletextarray[i])
                  //       //     .attr('text-anchor', 'middle')
                  //       //     .attr('dy', -1+1.3*i+'em')
                  //       // }
                  //
                  //       // g.append("text")
                  //       //   .attr("class", "value-text")
                  //       //   .text(d.data.percent+"%")
                  //       //   .attr('text-anchor', 'middle')
                  //       //   .attr('dy', '.6em');
                  //       //
                  //       // g.append("text")
                  //       //   .attr("class", "description-text")
                  //       //   .text(function() {
                  //       //           for (a = 0; a < that.d3Des.length; a++) {
                  //       //             if (that.d3Des[a].name == d.data.name){
                  //       //               return that.d3Des[a].dx;
                  //       //             }
                  //       //           }
                  //       //           return "No pre-set description found"; })
                  //       //   .attr('text-anchor', 'middle')
                  //       //   .attr('dy', '1.8em');
                  //
                  //       // d3.select("#donut-tooltip").classed("hidden", false);
                  //   })
              // .on("mouseout", function(d) {
              //                     d3.select(this)
              //                       .style("cursor", "none")
              //                       .style("fill", that.d3Color[this._current])
              //                       .select(".text-group").remove();
              //
              //                     // d3.select("#donut-tooltip").classed("hidden", true);
              //                 })
              .append('path')
              .attr('d', arc)
              .attr('fill', (d,i) => that.d3Color[i])
              .on("mouseover", function(d) {
                  d3.select(this)
                    .style("cursor", "pointer");
                    // .style("fill", "#66ccff");
                })
              .on("mouseout", function(d) {
                  d3.select(this)
                    .style("cursor", "none")
                    .style("fill", that.d3Color[this._current]);
                })
              .each(function(d, i) { this._current = i; });

          // var text = "";
          // gout.append('text')
          //     .attr('text-anchor', 'middle')
          //     .attr('dy', '.35em')
          //     .text(text);
      return path;
    // }
    },
    appendTooltip:function(path){
      var that = this;
      path.on("mouseover", function(d,i){
            var coordinates = d3.mouse(d3.event.currentTarget);
            // console.log(coordinates);
            // console.log(d3.select("#dooldip"))
            var tooltip = d3.select("#dooldip")
                            .style("width", "280px")
                            .style("height", "90px")
                            .style("left", 410+that.d3OffsetHor+"px")
                            .style("top", 4435+that.d3Offset+"px")
                            .style("background-color", that.d3Color[i]);
            // console.log(d)
            tooltip.select("#dooldipname")
                  .text(d.data.name);
            // console.log(tooltip.select("#dooldipname"));
            // console.log(text(d.name));
            tooltip.select("#dooldippercent")
                  .text(d.data.percent+"%");
            d3.select("#dooldip").classed("hidden", false);
          })
          .on("mouseout", function(){
            d3.select("#dooldip").classed("hidden", true);
          })
    }
  }
})

//customized vue instance for Organization Culture (oc)
var ocdescription = [
  {"name":"Accomplishment-oriented","dx":"OC"},
  {"name":"Kind-hearted","dx":"OCC"},
  {"name":"Change-oriented","dx":"OCCC"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var ocVue = new Vue({
  el: '#oc',
  data(){
    return{
      d3Data: {},
      d3Des: ocdescription,
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "oc-chart",
      innerRadius:0,
      outerRadius:140,
      move:"translate(-225,-10)",
      d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
      d3Offset:0,
      d3OffsetHor:0
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("ocVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("ocVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("ocVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("ocVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Organization Culture"]
          })
    }
  }
})

//customized vue instance for industries (in)
var indescription = [
  {"name":"Accomplishment-oriented","dx":"IN"},
  {"name":"Kind-hearted","dx":"INN"},
  {"name":"Change-oriented","dx":"INNN"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var inVue = new Vue({
  el: '#in',
  data(){
    return{
      d3Data: {},
      d3Des: indescription,
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "in-chart",
      innerRadius:0,
      outerRadius:140,
      move:"translate(125,-10)",
      d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
      d3Offset:0,
      d3OffsetHor:350
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("inVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("inVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("inVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("inVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Industry Types"]
          })
    }
  }
})

//customized vue instance for organizations (og)
var ogdescription = [
  {"name":"Accomplishment-oriented","dx":"OG"},
  {"name":"Kind-hearted","dx":"OGG"},
  {"name":"Change-oriented","dx":"OGGG"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var ogVue = new Vue({
  el: '#og',
  data(){
    return{
      d3Data: {},
      d3Des: ogdescription,
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "og-chart",
      innerRadius:0,
      outerRadius:140,
      move:"translate(475,-10)",
      d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
      d3Offset:0,
      d3OffsetHor:700
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("ogVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("ogVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("ogVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("ogVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Organization Types"]
          })
    }
  }
})

//customized vue instance for areas of study (as)
// var asdescription = [
//   {"name":"Accomplishment-oriented","dx":"areas of study"},
//   {"name":"Kind-hearted","dx":"areas of study"},
//   {"name":"Change-oriented","dx":"areas of study"},
//   {"name":"test1","dx":"des"},
//   {"name":"test2","dx":"des"},
//   {"name":"test3","dx":"des"},
//   {"name":"test4","dx":"des"},
//   {"name":"test5","dx":"des"},
//   {"name":"test6","dx":"des"}];
//
// var asVue = new Vue({
//   el: '#as',
//   data(){
//     return{
//       d3Data: {},
//       d3Des: asdescription,
//       vueSchool:"",
//       vueProgram:"",
//       vueRace:"",
//       vueGender:"",
//       vueIncome:"",
//       vueFirst:"",
//       vueAttendance:"",
//       chartid: "as-chart"
//     }
//   },
//   computed:{
//     isChanged(){
//       return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
//     }
//   },
//   watch: {
//     isChanged() {
//       // console.log("asVue watch")
//       this.fetchData();
//     }
//   },
//   created: function(){
//     // console.log("asVue created")
//     this.fetchData();
//   },
//   // mounted: function(){
//     // console.log("asVue mounted")
//   // },
//   methods: {
//     fetchData: function(){
//       // console.log("asVue methods fetchData")
//       var link = window.produceLink(this);
//       fetch(link)
//           .then(response => response.json())
//           .then(json => {
//             this.d3Data = json.data["0"]["Areas of Study"]
//           })
//     }
//   }
// })

//reusable vue component for picture chart
Vue.component('picture-chart', {
  props: ['d3Data'],
  delimiters:["<%","%>"],
  template:`
    <div>
      <span class="mr1">
        <img src="img/mr/1.png" class="img-responsive" width="100" height="200"></svg>
        <p>1. <% d3Data["0"]["name"] %></p>
        <p><% d3Data["0"]["percent"] %>%</p>
      </span>

      <span class="mr2">
        <img src="img/mr/2.png" class="img-responsive" width="100" height="200"></svg>
        <p>2. <% d3Data["1"]["name"] %></p>
        <p><% d3Data["1"]["percent"] %>%</p>
      </span>

      <span class="mr3">
        <img src="img/mr/3.png" class="img-responsive" width="100" height="200"></svg>
        <p>3. <% d3Data["2"]["name"] %></p>
        <p><% d3Data["2"]["percent"] %>%</p>
      </span>

      <span class="mr4">
        <img src="img/mr/4.png" class="img-responsive" width="100" height="200"></svg>
        <p>4. <% d3Data["3"]["name"] %></p>
        <p><% d3Data["3"]["percent"] %>%</p>
      </span>

      <span class="mr5">
        <img src="img/mr/5.png" class="img-responsive" width="100" height="200"></svg>
        <p>5. <% d3Data["4"]["name"] %></p>
        <p><% d3Data["4"]["percent"] %>%</p>
      </span>

      <span class="mr6">
        <img src="img/mr/6.png" class="img-responsive" width="100" height="200"></svg>
        <p>6. <% d3Data["5"]["name"] %></p>
        <p><% d3Data["5"]["percent"] %>%</p>
      </span>

      <span class="mr7">
        <img src="img/mr/7.png" class="img-responsive" width="100" height="200"></svg>
        <p>7. <% d3Data["6"]["name"] %></p>
        <p><% d3Data["6"]["percent"] %>%</p>
      </span>

      <span class="mr8">
        <img src="img/mr/8.png" class="img-responsive" width="100" height="200"></svg>
        <p>8. <% d3Data["7"]["name"] %></p>
        <p><% d3Data["7"]["percent"] %>%</p>
      </span>

      <span class="mr9">
        <img src="img/mr/9.png" class="img-responsive" width="100" height="200"></svg>
        <p>9. <% d3Data["8"]["name"] %></p>
        <p><% d3Data["8"]["percent"] %>%</p>
      </span>
    </div>
  `
})

var mrVue = new Vue({
  el: '#mr',
  data(){
    return{
      d3Data: {},
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:""
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("mrVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("mrVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("mrVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("mrVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Model Roles"]
          })
    }
  }
})

Vue.component('list-chart',{
  props:['d3Data'],
  delimiters:["<%","%>"],
  template:`
    <div>
      <ol>
        <li><% d3Data["0"]["name"] %> <% d3Data["0"]["percent"] %>%</li>
        <li><% d3Data["1"]["name"] %> <% d3Data["1"]["percent"] %>%</li>
        <li><% d3Data["2"]["name"] %> <% d3Data["2"]["percent"] %>%</li>
        <li><% d3Data["3"]["name"] %> <% d3Data["3"]["percent"] %>%</li>
        <li><% d3Data["4"]["name"] %> <% d3Data["4"]["percent"] %>%</li>
        <li><% d3Data["5"]["name"] %> <% d3Data["5"]["percent"] %>%</li>
        <li><% d3Data["6"]["name"] %> <% d3Data["6"]["percent"] %>%</li>
        <li><% d3Data["7"]["name"] %> <% d3Data["7"]["percent"] %>%</li>
        <li><% d3Data["8"]["name"] %> <% d3Data["8"]["percent"] %>%</li>
      </ol>
      <img id="as-img" src="img/areasofstudy.png">
    </div>
  `
})

var asVue = new Vue({
  el: '#as',
  data(){
    return{
      d3Data: {},
      vueInstitution:"",
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:""
    }
  },
  computed:{
    isChanged(){
      return [this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      // console.log("asVue watch")
      this.fetchData();
    }
  },
  created: function(){
    // console.log("asVue created")
    this.fetchData();
  },
  // mounted: function(){
    // console.log("asVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("asVue methods fetchData")
      var link = window.produceLink(this);
      fetch(link)
          .then(response => response.json())
          .then(json => {
            this.d3Data = json.data["0"]["Areas of Study"]
          })
    }
  }
})
