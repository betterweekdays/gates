//customized info for dominant value (dv) dvDescription taken from JobScript sample report
var dvDescription = [
      {"name":"Helping People","dx":"Students areasofstudy compassionate, service oriented and respond to the developmental needs of those around them."},
      {"name":"Constantly Being Curious","dx":"Students seek out underlying reasons why things happen and investigate complex problems."},
      {"name":"Creating New Things","dx":"Students have a desire to be creative and artistic leading to innovative designs, products and works of art."},
      {"name":"Motivating Others","dx":"Students have tremendous enthusiasm and motivation to share excitement with others, often get people to enjoy the moment."},
      {"name":"Effecting Change","dx":"Students care about things that affect society, create change and influence opinions toward the common good."},
      {"name":"Keeping Perspective","dx":"Students are keen observers of life who want to ensure the natural order is respected and maintained."},
      {"name":"Getting Things Done","dx":"Students are action-oriented, motivated by hard work and determination to get things done; classic “doers” who can be counted on."},
      {"name":"Seeing the Big Picture","dx":"Students have capacity to see the big picture and develop effective strategies to manage projects."},
      {"name":"Taking Risks","dx":"Students are excited by challenging entrepreneurial circumstances."}];

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
      tooltipLeftMargin:114, /*115, 1170,*/
      tooltipTopMargin:150, /*-445, 1025,*/
      tooltipWidth:225,
      tooltipHeight:350,
      tooltipFontSize:20,
      d3Color: ["#505160","#5c6a7f","#68829e","#7a9185","#8ba06b","#9daf52","#aebd38","#84a036","#598234"]
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
  {"name":"Accomplishment-oriented","dx":"Students are practical-minded people who want to see tangible accomplishment from their efforts. Hands-on and no-nonsense in their approach will have them be responsible and effective."},
  {"name":"Kind-hearted","dx":"Students are compassionate and kind-natured. Students will see the good in people and seek to help them when they are in trouble. Students' empathy helps them see others side of issues and their needs."},
  {"name":"Change-oriented","dx":"Students like to instigate change. Students hold fairly strong opinions and will seek to influence how people see things, likely through their writings and words."},
  {"name":"Quite Respectful","dx":"Students are watchful and observant and seek to ensure that a healthy balance is maintained. Students are patient, but will guard against injustice and unfair treatments if they see it occur."},
  {"name":"Big-picture Thinker","dx":"Students like to see all sides of an issue and make the big decisions. Students want to think things through logically and integrate their findings into solutions. Often thinking they are right, students will seek to manage others to get things done."},
  {"name":"Highly Motivated","dx":"Students are driven to succeed. Students will take on challenge and overcome obstacles in order to achieve their goals and gain the rewards that come from winning."},
  {"name":"Very Outgoing","dx":"Students are exciting and enthusiastic. Students' energy will be infectious and help people to enjoy activities that they are involved with."},
  {"name":"Definitely Innovative","dx":"Students are creative and likely independent in their thinking. Students like to try new things and invent unique ways of seeing something"},
  {"name":"Very Inquisitive","dx":"Students are very curious and like to solve complex and intricate questions. Always wanting to know why something happens will have them explore facts and question reasons for things."}];

var ksVue = new Vue({
  el: '#ks',
  data(){
    return{
      chartid:"ks-chart",
      chartWidth:700,
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
      d3Offset:0,
      d3Des: ksDescription,
      d3Translate:160,
      d3TranslateHor:305,
      tooltipWidth:250,
      tooltipHeight:275,
      tooltipTopMargin:931, /*1850,*/
      tooltipLeftMargin:3, /*375,*/
      tooltipFontSize:15,
      d3Color: ["#003B46","#044951","#07575B","#176469","#377E84","#56989F","#66A5AD","#95C2CA","#C4DFE6"]
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
  {"name":"Likely frustrated when not seeing results","dx":"Students work diligently to get things done on their own, but could be frustrated when working with others if things take too long. Be careful of showing their frustrations inappropriately."},
  {"name":"Tend to take things personally","dx":"Because students care about people and want to have people like them, students may be offended by criticism, especially when it relates to how they are treating others."},
  {"name":"Could hold on to anger","dx":"Students' high sense of integrity will cause them to want to be respectful and do things the right way. However, this could cause them to hold grudges toward those who are disrespectful."},
  {"name":"Tend to always think you are right","dx":"Because students think things through and see all sides of an issue, students will have considerable confidence in their reasoned decisions and conclusions. Students may feel justified in thinking that people need to see things their way."},
  {"name":"Might tend to compete with people","dx":"Students' drive and courage may have them compete to win, and they may fail to see when this approach is inappropriate to a given situation."},
  {"name":"Might tend to talk too much","dx":"Students' high energy and dynamic nature may cause them to state their opinions too often. However, be careful of spending too much time sharing students' views."},
  {"name":"Could be highly judgmental","dx":"Because students hold strong opinions, they will tend to judge people. Be careful of how this will be perceived and affect others."},
  {"name":"Might over-analyze everything","dx":"Students want all the details before coming to conclusions. This may cause them to have difficulty with stopping their research and coming to a decision."},
  {"name":"Might always want to get your way","dx":"Because students see creative visions and unique perspectives, they will assume that people should want the same things that they do."}];

var caVue = new Vue({
  el: '#ca',
  data(){
    return{
      chartid:"ca-chart",
      chartWidth:700,
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
      d3Offset:50,
      d3Des: caDescription,
      d3Translate:240,
      d3TranslateHor:305,
      tooltipWidth:220,
      tooltipHeight:275,
      tooltipTopMargin:1422, /*2255,*/
      tooltipLeftMargin:114, /*1200,*/
      tooltipFontSize:14,
      d3Color: ["#1995ad","#46abbf","#74c0d0","#a1d6e2","#aacdd6","#b3c3ca","#b8bfc4","#bcbabe","#d7d6d8"]
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
    {"name":"Creating","dx":""},
    {"name":"Marketing","dx":""},
    {"name":"Strategizing","dx":""},
    {"name":"Explaining","dx":""},
    {"name":"Researching","dx":""},
    {"name":"Teaching","dx":""},
    {"name":"Surveying","dx":""},
    {"name":"Motivating","dx":""},
    {"name":"Producing","dx":""}];

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
      innerRadius:110,
      outerRadius:150,
      move:"translate(0,-50)",
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
  {"name":"Professional/Strategic","dx":""},
  {"name":"Technical/Scientific","dx":""},
  {"name":"Multi-cultural/Democratic","dx":""},
  {"name":"Hands-On/Structured","dx":""},
  {"name":"Creative/Experimental","dx":""},
  {"name":"Entrepreneurial/High-Growth","dx":""},
  {"name":"Natural/Respectful & Concerned","dx":""},
  {"name":"Dynamic/Exciting","dx":""},
  {"name":"Educational/Service-Oriented","dx":""}];

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
        innerRadius:110,
        outerRadius:150,
        move:"translate(0,-50)",
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
      move:"translate(0,-10)",
      d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
      d3Offset:93, //tooltip top margin
      d3OffsetHor:20 //tooltip left margin
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
      move:"translate(0,-10)",
      d3Color:["#bdc089","#9a9eab","#7c7985","#5d535e","#8d6975","#bc808d","#ec96a4","#e6bc85","#dfe166"],
      d3Offset:93,
      d3OffsetHor:120
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
