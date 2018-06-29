function barchart(svg, data){
  //create x&y scale and axis
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
                  .domain([0, d3.max(data, function(d) { return d.percent; })+10])
                  .range([0, 722]);
  var xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(tickVals);
  var yScale = d3.scaleBand()
                  .domain(d3.range(0, 9))
                  .range([0, 480]);
  var yAxis = d3.axisLeft()
                .scale(yScale)
                .tickSize(2)
                .tickFormat(function(d, i){
                              return data[i].name;
                })
                .tickValues(d3.range(9));

  //apend axis
  var xx = svg.append("g")
                .attr("transform", "translate(150, 480)")
                .attr("id", "xaxis")
                .call(xAxis);
  var yx = svg.append("g")
                .attr("transform", "translate(150, 0)")
                .attr("id", "yaxis")
                .call(yAxis);

  //append bars and tooltips
  var bars = svg.append("g")
                .attr("transform", "translate(150, 0)")
                .attr("id","bars")
                .attr("class", "bar")
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("width", function(d){
                                  return xScale(d.percent);
                })
                .attr("height", 32)
                // .attr("fill", function(d,i){
                //       return color(Math.random()*10*i)
                // })
                // .attr("fill", "#00a8ff")
                .attr("x", 1)
                .attr("y", function(d,i){
                    return yScale(i)+12; })
                .on("mouseover", function(d,i){
                                    var tt = d3.select("#tooltip")
                                                .style("left", xScale(d.percent)+300+"px")
                                                .style("top", 1350+yScale(i)+"px");
                                    tt.select("#value")
                                      .text(d.percent);
                                    tt.select("#title")
                                      .text(d.name);
                                    tt.select("#text")
                                      .text(description[i].dx);

                                    d3.select("#tooltip").classed("hidden", false);
                })
                .on("mouseout", function(){
                                  d3.select("#tooltip").classed("hidden", true);
                });

  //add label to bar chart
  svg.append("g")
      .attr("id", "label");
  var label = svg.select("#bars")
                  .selectAll("text")
                  .data(data)
                  .enter()
                  .append("text")
                  .text(function(d){
                    return d.percent+"%";
                  })
                  .attr("y", function(d,i){
                    return yScale(i)+32;
                  })
                  .attr("x", function(d){
                    return xScale(d.percent)+10;
                  });
}
