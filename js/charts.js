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
      // vueInstitution:"",
      // vueSchool:[],
      // vueProgram:[],
      // vueRace:[],
      // vueGender:"",
      // vueIncome:"",
      // vueFirst:"",
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
  }
  // computed:{
  //   isChanged(){
  //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
  //   }
  // },
  // watch: {
  //   isChanged() {
  //     // console.log("dvVue watch")
  //     this.fetchData();
  //   }
  // },
  // // created: function(){
  // //   // console.log("dvVue created")
  // //   this.fetchData();
  // // },
  // // mounted: function(){
  // //   console.log("dvVue mounted")
  // // },
  // methods: {
  //   fetchData: function(){
  //     // console.log("dvVue methods fetchData")
  //     var link = window.produceLink(this);
  //     fetch(link)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.d3Data = json.data["0"]["Dominant Values"]
  //         })
  //   }
  // }
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
      // vueInstitution:"",
      // vueSchool:"",
      // vueProgram:"",
      // vueRace:"",
      // vueGender:"",
      // vueIncome:"",
      // vueFirst:"",
      // vueAttendance:"",
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
  }
  // computed:{
  //   isChanged(){
  //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
  //   }
  // },
  // watch: {
  //   isChanged() {
  //     // console.log("ksVue watch")
  //     this.fetchData();
  //   }
  // },
  // // created: function(){
  // //   // console.log("ksVue created")
  // //   this.fetchData();
  // // },
  // // mounted: function(){
  //   // console.log("ksVue mounted")
  // // },
  // methods: {
  //   fetchData: function(){
  //     // console.log("ksVue methods fetchData")
  //     var link = window.produceLink(this);
  //     fetch(link)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.d3Data = json.data["0"]["Key Strengths"]
  //         })
  //   }
  // }
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
      // vueInstitution:"",
      // vueSchool:"",
      // vueProgram:"",
      // vueRace:"",
      // vueGender:"",
      // vueIncome:"",
      // vueFirst:"",
      // vueAttendance:"",
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
  }
  // computed:{
  //   isChanged(){
  //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
  //   }
  // },
  // watch: {
  //   isChanged() {
  //     // console.log("caVue watch")
  //     this.fetchData();
  //   }
  // },
  // // created: function(){
  // //   // console.log("caVue created")
  // //   this.fetchData();
  // // },
  // // mounted: function(){
  //   // console.log("caVue mounted")
  // // },
  // methods: {
  //   fetchData: function(){
  //     // console.log("caVue methods fetchData")
  //     var link = window.produceLink(this);
  //     fetch(link)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.d3Data = json.data["0"]["Caution Areas"]
  //         })
  //   }
  // }
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
      // vueInstitution:"",
      // vueSchool:"",
      // vueProgram:"",
      // vueRace:"",
      // vueGender:"",
      // vueIncome:"",
      // vueFirst:"",
      // vueAttendance:"",
      chartid: "jf-chart",
      innerRadius:150,
      outerRadius:200,
      move:"translate(-150,0)",
      d3Color:["#afbf7c","#f4cc70","#e9a349","#de7a22","#7f8757","#209488","#399e8a","#51a788","#6ab187"]
    }
  }
  // computed:{
  //   isChanged(){
  //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
  //   }
  // },
  // watch: {
  //   isChanged() {
  //     // console.log("jfVue watch")
  //     this.fetchData();
  //   }
  // },
  // // created: function(){
  // //   // console.log("jfVue created")
  // //   this.fetchData();
  // // },
  // // mounted: function(){
  //   // console.log("jfVue mounted")
  // // },
  // methods: {
  //   fetchData: function(){
  //     // console.log("jfVue methods fetchData")
  //     var link = window.produceLink(this);
  //     fetch(link)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.d3Data = json.data["0"]["Job Functions"]
  //         })
  //   }
  // }
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
// var rpdescription = [
//   {"name":"Accomplishment-oriented","dx":"roles & positions"},
//   {"name":"Kind-hearted","dx":"roles & positions"},
//   {"name":"Change-oriented","dx":"roles & positions"},
//   {"name":"test1","dx":"des"},
//   {"name":"test2","dx":"des"},
//   {"name":"test3","dx":"des"},
//   {"name":"test4","dx":"des"},
//   {"name":"test5","dx":"des"},
//   {"name":"test6","dx":"des"}];

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
        // vueInstitution:"",
        // vueSchool:"",
        // vueProgram:"",
        // vueRace:"",
        // vueGender:"",
        // vueIncome:"",
        // vueFirst:"",
        // vueAttendance:"",
        chartid: "oc-chart",
        innerRadius:150,
        outerRadius:200,
        move:"translate(400,0)",
        d3Color:["#afbf7c","#f4cc70","#e9a349","#de7a22","#7f8757","#209488","#399e8a","#51a788","#6ab187"]
      }
    }
    // computed:{
    //   isChanged(){
    //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    //   }
    // },
    // watch: {
    //   isChanged() {
    //     // console.log("rpVue watch")
    //     this.fetchData();
    //   }
    // },
    // // created: function(){
    // //   // console.log("rpVue created")
    // //   this.fetchData();
    // // },
    // // mounted: function(){
    //   // console.log("rpVue mounted")
    // // },
    // methods: {
    //   fetchData: function(){
    //     // console.log("rpVue methods fetchData")
    //     var link = window.produceLink(this);
    //     fetch(link)
    //         .then(response => response.json())
    //         .then(json => {
    //           this.d3Data = json.data["0"]["Organization Culture"]
    //         })
    //   }
    // }
  })

//customized vue instance for Organization Culture (oc)
// var ocdescription = [
//   {"name":"Accomplishment-oriented","dx":"OC"},
//   {"name":"Kind-hearted","dx":"OCC"},
//   {"name":"Change-oriented","dx":"OCCC"},
//   {"name":"test1","dx":"des"},
//   {"name":"test2","dx":"des"},
//   {"name":"test3","dx":"des"},
//   {"name":"test4","dx":"des"},
//   {"name":"test5","dx":"des"},
//   {"name":"test6","dx":"des"}];
//
// var ocVue = new Vue({
//   el: '#oc',
//   data(){
//     return{
//       d3Data: {},
//       d3Des: ocdescription,
//       vueInstitution:"",
//       vueSchool:"",
//       vueProgram:"",
//       vueRace:"",
//       vueGender:"",
//       vueIncome:"",
//       vueFirst:"",
//       vueAttendance:"",
//       chartid: "oc-chart",
//       innerRadius:0,
//       outerRadius:140,
//       move:"translate(-225,-10)",
//       d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
//       d3Offset:0,
//       d3OffsetHor:0
//     }
//   },
//   computed:{
//     isChanged(){
//       return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
//     }
//   },
//   watch: {
//     isChanged() {
//       // console.log("ocVue watch")
//       this.fetchData();
//     }
//   },
//   created: function(){
//     // console.log("ocVue created")
//     this.fetchData();
//   },
//   // mounted: function(){
//     // console.log("ocVue mounted")
//   // },
//   methods: {
//     fetchData: function(){
//       // console.log("ocVue methods fetchData")
//       var link = window.produceLink(this);
//       fetch(link)
//           .then(response => response.json())
//           .then(json => {
//             this.d3Data = json.data["0"]["Organization Culture"]
//           })
//     }
//   }
// })

//customized vue instance for industries (in)
var ladescription = [
  {"name":"Accomplishment-oriented","dx":"IN"},
  {"name":"Kind-hearted","dx":"INN"},
  {"name":"Change-oriented","dx":"INNN"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var laVue = new Vue({
  el: '#la',
  data(){
    return{
      d3Data: {},
      d3Des: ladescription,
      // vueInstitution:"",
      // vueSchool:"",
      // vueProgram:"",
      // vueRace:"",
      // vueGender:"",
      // vueIncome:"",
      // vueFirst:"",
      // vueAttendance:"",
      chartid: "la-chart",
      innerRadius:0,
      outerRadius:140,
      move:"translate(125,-10)",
      d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
      d3Offset:0,
      d3OffsetHor:350
    }
  }
  // computed:{
  //   isChanged(){
  //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
  //   }
  // },
  // watch: {
  //   isChanged() {
  //     // console.log("inVue watch")
  //     this.fetchData();
  //   }
  // },
  // // created: function(){
  // //   // console.log("inVue created")
  // //   this.fetchData();
  // // },
  // // mounted: function(){
  //   // console.log("inVue mounted")
  // // },
  // methods: {
  //   fetchData: function(){
  //     // console.log("inVue methods fetchData")
  //     var link = window.produceLink(this);
  //     fetch(link)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.d3Data = json.data["0"]["Leadership Anchors"]
  //         })
  //   }
  // }
})

//customized vue instance for organizations (og)
var skdescription = [
  {"name":"Accomplishment-oriented","dx":"OG"},
  {"name":"Kind-hearted","dx":"OGG"},
  {"name":"Change-oriented","dx":"OGGG"},
  {"name":"test1","dx":"des"},
  {"name":"test2","dx":"des"},
  {"name":"test3","dx":"des"},
  {"name":"test4","dx":"des"},
  {"name":"test5","dx":"des"},
  {"name":"test6","dx":"des"}];

var skVue = new Vue({
  el: '#sk',
  data(){
    return{
      d3Data: {},
      d3Des: skdescription,
      // vueInstitution:"",
      // vueSchool:"",
      // vueProgram:"",
      // vueRace:"",
      // vueGender:"",
      // vueIncome:"",
      // vueFirst:"",
      // vueAttendance:"",
      chartid: "sk-chart",
      innerRadius:0,
      outerRadius:140,
      move:"translate(475,-10)",
      d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
      d3Offset:0,
      d3OffsetHor:700
    }
  }
  // computed:{
  //   isChanged(){
  //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
  //   }
  // },
  // watch: {
  //   isChanged() {
  //     // console.log("ogVue watch")
  //     this.fetchData();
  //   }
  // },
  // // created: function(){
  // //   // console.log("ogVue created")
  // //   this.fetchData();
  // // },
  // // mounted: function(){
  //   // console.log("ogVue mounted")
  // // },
  // methods: {
  //   fetchData: function(){
  //     // console.log("ogVue methods fetchData")
  //     var link = window.produceLink(this);
  //     fetch(link)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.d3Data = json.data["0"]["Success Keys"]
  //         })
  //   }
  // }
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

var mrVue = new Vue({
  el: '#mr',
  data(){
    return{
      d3Data: {},
      // vueInstitution:"",
      // vueSchool:"",
      // vueProgram:"",
      // vueRace:"",
      // vueGender:"",
      // vueIncome:"",
      // vueFirst:"",
      // vueAttendance:""
    }
  }
  // computed:{
  //   isChanged(){
  //     return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
  //   }
  // },
  // watch: {
  //   isChanged() {
  //     // console.log("mrVue watch")
  //     this.fetchData();
  //   }
  // },
  // // created: function(){
  // //   // console.log("mrVue created")
  // //   this.fetchData();
  // // },
  // // mounted: function(){
  //   // console.log("mrVue mounted")
  // // },
  // methods: {
  //   fetchData: function(){
  //     // console.log("mrVue methods fetchData")
  //     var link = window.produceLink(this);
  //     fetch(link)
  //         .then(response => response.json())
  //         .then(json => {
  //           this.d3Data = json.data["0"]["Model Roles"]
  //         })
  //   }
  // }
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

// var asVue = new Vue({
//   el: '#as',
//   data(){
//     return{
//       d3Data: {},
//       vueInstitution:"",
//       vueSchool:"",
//       vueProgram:"",
//       vueRace:"",
//       vueGender:"",
//       vueIncome:"",
//       vueFirst:"",
//       vueAttendance:""
//     }
//   },
//   computed:{
//     isChanged(){
//       return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
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
