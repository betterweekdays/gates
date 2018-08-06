//reusable vue component for bar chart
var barcpo = Vue.component('bar-chart', {
  props: ['d3Data','d3Offset', 'd3Des', 'chartid', 'chartWidth', 'chartHeight', 'd3Translate','d3TranslateHor','tooltipTopMargin','tooltipLeftMargin','tooltipWidth','tooltipHeight','d3Color'],
  template:`
    <div>
      <svg :id="chartid" :width="chartWidth" :height="chartHeight"></svg>
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
                            .style("left", that.tooltipLeftMargin+"%")
                            // .style("left", getScales.xScale(d.percent)+400+"px")
                            .style("top", that.tooltipTopMargin+"%")
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

//reusable vue compoenent for donut chart
var donutcpo = Vue.component('donut-chart', {
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

//reusable vue compoenent for filled donut chart
var piecpo = Vue.component('filled-donut-chart', {
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

//reusable vue component for picture chart
var piccpo = Vue.component('picture-chart', {
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
