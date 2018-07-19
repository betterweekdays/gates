//reusable vue component for bar chart
Vue.component('bar-chart', {
  props: ['d3Data','d3Offset','d3Des', 'chartid'],
  template:`
    <div>
      <svg :id="chartid" width="900" height="550"></svg>
      <div id="tooltip" class="hidden">
          <p><strong><span id="title"></span></strong></p>
          <p><span id="value"></span>%</p>
          <p><span id="text"></span></p>
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
                                    return {'x1':0, 'y1':0, 'x2':0, 'y2':480};
      });
      var tickVals = grid.map(function(d, i){
                                if (i>0){
                                  return i*10;
                                } else if (i==0){
                                  return "100";
                                }
      });
      var xScale = d3.scaleLinear()
                      .domain([0, d3.max(that.d3Data, function(d) { return d.percent; })+10])
                      .range([0, 722]);
      var yScale = d3.scaleBand()
                      .domain(d3.range(0, 9))
                      .range([0, 480]);
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
      // var svg = d3.select("#"+that.chartid);
      if (!svg.selectAll("*").empty()){
        svg.selectAll("*").remove();
      }
    },
    appendAxis: function(){
      var that = this;
      var svg = d3.select("#"+that.chartid);
      that.checkDup(svg);
      // console.log("inside bar component")
      // console.log(svg.selectAll("*"))
      // console.log(svg.selectAll("*").empty())
      // console.log(that.d3Data)
      var getAxis = that.prepareAxis();
      var xx = svg.append("g")
                    .attr("transform", "translate(150, 480)")
                    .attr("id", "xaxis")
                    .call(getAxis.xAxis);
      var yx = svg.append("g")
                    .attr("transform", "translate(150, 0)")
                    .attr("id", "yaxis")
                    .call(getAxis.yAxis);
    },
    appendBars: function(){
      var that = this;
      var getScales = that.prepareScales();
      var svg = d3.select("#"+that.chartid);
      var bars = svg.append("g")
            .attr("transform", "translate(150, 0)")
            .attr("id","bars")
            .attr("class", "bar")
            .selectAll("rect")
            .data(that.d3Data)
            .enter()
            .append("rect")
            .attr("width", function(d){
                              return getScales.xScale(d.percent);
            })
            .attr("height", 32)
            .attr("x", 1)
            .attr("y", function(d,i){
                return getScales.yScale(i)+12; })
      return bars;
    },
    tooltip: function(bars){
      var that = this;
      var getScales = that.prepareScales();
      bars.on("mouseover", function(d,i){
                  var tt = d3.select("#tooltip")
                            .style("left", getScales.xScale(d.percent)+400+"px")
                            .style("top", that.d3Offset+1800+getScales.yScale(i)+"px");
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
                        return getScales.yScale(i)+32;
                      })
                      .attr("x", function(d){
                        return getScales.xScale(d.percent)+10;
                      });
    }
  }
})

function produceLink(that){
  if (that.vueSchool.constructor === Array) that.vueSchool.sort();
  if (that.vueProgram.constructor === Array) that.vueProgram.sort();
  if (that.vueRace.constructor === Array) that.vueRace.sort();

  var prelink = "https://betterweekdays.github.io/gates/data/";

  // if ((!that.vueSchool||that.vueSchool.length===0)&&(!that.vueProgram||that.vueProgram.length===0)&&(!that.vueGender||that.vueGender.length===0)&&(!that.vueRace||that.vueRace.length===0)&&(!that.vueIncome||that.vueIncome.length===0)&&(!that.vueFirst||that.vueFirst.length===0)&&(!that.vueAttendance||that.vueAttendance.length===0)){
  //   link = "https://betterweekdays.github.io/gates/data/emptydata.json"
  // } else{
  // if (!that.vueSchool||that.vueSchool.length===0){
  //   prelink=prelink+"school=A&"
  // } else{
    for (i=0; i<that.vueSchool.length;i++){
      prelink = prelink + "school=" + that.vueSchool[i]+"&"
    }
  // }
  // if (!that.vueProgram||that.vueProgram.length===0){
  //   prelink = prelink + "program=A&"
  // }else{
    for (i=0; i<that.vueProgram.length;i++){
      prelink = prelink + "program=" + that.vueProgram[i]+"&"
    }
  // }
  // if (!that.vueRace||that.vueRace.length===0){
  //   prelink=prelink+"race=A&"
  // }else{
    for (i=0; i<that.vueRace.length;i++){
      prelink = prelink + "race=" + that.vueRace[i]+"&"
    }
  // }
  if (that.vueGender) prelink = prelink + "gender=" + that.vueGender+"&"
  if (that.vueIncome) prelink = prelink + "income=" + that.vueIncome+"&"
  if (that.vueFirst) prelink = prelink + "first=" + that.vueFirst+"&"
  if (that.vueAttendance) prelink = prelink + "attendance=" + that.vueAttendance+"&"
  var link = prelink.substring(0, prelink.length-1)+".json"
  //for testing purpose
  // console.log(link)
  if (link !== "https://betterweekdays.github.io/gates/data/school=A&program=B&race=C&gender=A&income=B&first=C&attendance=A.json" && link !== "https://betterweekdays.github.io/gates/data/school=B&program=B&race=C&gender=C&income=A&first=A&attendance=A.json"){
    link = "https://betterweekdays.github.io/gates/data/testdata.json";
  }
  // }
  // console.log(link)
  return link;
}

//customized info for dominant value (dv)
var dvDescription = [
      {"name":"Motivational Energy","dx":"Description for Motivational Energy"},
      {"name":"Strategic Decisions","dx":"Description for Strategic Decisions"},
      {"name":"Entrepreneurial Challenge","dx":"Description for Entrepreneurial Challenge"},
      {"name":"Natural Appreciation","dx":"Description for Natural Appreciation"},
      {"name":"Production Efficiency","dx":"Description for Production Efficiency"},
      {"name":"Artistic Creativity","dx":"Description for Artistic Creativity"},
      {"name":"Human Development","dx":"Description for Human Development"},
      {"name":"Societal Change","dx":"Description for Societal Change"},
      {"name":"Theoretical Discovery","dx":"Description for Theoretical Discovery"}];

var dvVue = new Vue({
  el: '#dv',
  data(){
    return{
      chartid:"dv-chart",
      d3Data: {},
      vueSchool:[],
      vueProgram:[],
      vueRace:[],
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      d3Offset:0,
      d3Des: dvDescription
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
    // console.log("app.maincpo.school_selected: "+app.maincpo.school_selected)
    // console.log("inside dvVue created w vueProgram: ")
    // console.log(this.vueProgram)
    this.fetchData();
  },
  // mounted: function(){
  //   console.log("dvVue mounted")
  // },
  methods: {
    fetchData: function(){
      // console.log("dvVue methods fetchData")
      // console.log(this.vueSchool)
      // console.log(this.vueGender)
      // console.log(this.vueAttendance)
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
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      d3Data: {},
      d3Offset:1100,
      d3Des: ksDescription
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
  mounted: function(){
    // console.log("ksVue mounted")
  },
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
      d3Data: {},
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      d3Offset:1700,
      d3Des: caDescription
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
  mounted: function(){
    // console.log("caVue mounted")
  },
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
  props: ['d3Data', 'd3Des', 'chartid'],
  template:`
    <div>
      <svg class="pie" width="400" height="400">
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
      var color = d3.scaleOrdinal(d3.schemeBlues[9]);

      var arc = d3.arc()
                  .innerRadius(140) //radius-thickness
                  .outerRadius(200); //radius

      var pie = d3.pie()
                  .value(function(d) { return d.percent; })
                  .sort(null);

      return {color, arc, pie};
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
      var color = elements.color;
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
                                  .style("fill", "#fed136")
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
                                    if (that.d3Des[a].name == d.name){
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
                                    .style("fill", color(this._current))
                                    .select(".text-group").remove();
                              })
              .append('path')
              .attr('d', arc)
              .attr('fill', (d,i) => color(i))
              .on("mouseover", function(d) {
                  d3.select(this)
                    .style("cursor", "pointer")
                    .style("fill", "#fed136");
                })
              .on("mouseout", function(d) {
                  d3.select(this)
                    .style("cursor", "none")
                    .style("fill", color(this._current));
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
    {"name":"Accomplishment-oriented","dx":"job functions"},
    {"name":"Kind-hearted","dx":"job functions"},
    {"name":"Change-oriented","dx":"job functions"},
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
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "jf-chart"
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
  mounted: function(){
    // console.log("jfVue mounted")
  },
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
var mrDescription = [
  {"name":"Alice","dx":"Description for Alice"},
  {"name":"Ben","dx":"Description for Ben"},
  {"name":"Cici","dx":"Description for Cici"},
  {"name":"Dave","dx":"Description for Dave"},
  {"name":"Eva","dx":"Description for Eva"},
  {"name":"Frank","dx":"Description for Frank"},
  {"name":"Gigi","dx":"Description for Gigi"},
  {"name":"Helen","dx":"Description for Helen"},
  {"name":"Iris","dx":"Description for Iris"}];

var mrVue = new Vue({
  el: '#mr',
  data(){
    return{
      chartid:"mr-chart",
      d3Data: {},
      d3Offset:3250,
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      d3Des: mrDescription
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
  mounted: function(){
    // console.log("mrVue mounted")
  },
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
        vueSchool:"",
        vueProgram:"",
        vueRace:"",
        vueGender:"",
        vueIncome:"",
        vueFirst:"",
        vueAttendance:"",
        chartid: "rp-chart"
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
    mounted: function(){
      // console.log("rpVue mounted")
    },
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
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "oc-chart"
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
  mounted: function(){
    // console.log("ocVue mounted")
  },
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
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "in-chart"
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
  mounted: function(){
    // console.log("inVue mounted")
  },
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
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "og-chart"
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
  mounted: function(){
    // console.log("ogVue mounted")
  },
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
var asdescription = [
  {"name":"Accomplishment-oriented","dx":"areas of study"},
  {"name":"Kind-hearted","dx":"areas of study"},
  {"name":"Change-oriented","dx":"areas of study"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var asVue = new Vue({
  el: '#as',
  data(){
    return{
      d3Data: {},
      d3Des: asdescription,
      vueSchool:"",
      vueProgram:"",
      vueRace:"",
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:"",
      chartid: "as-chart"
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
  mounted: function(){
    // console.log("asVue mounted")
  },
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
