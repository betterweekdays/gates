var sum = Vue.component('sum',{
  props:['pv','ks','ca',"total"],
  delimiters:["<%", "%>"],
  template:`
    <div class="hero-italic">
      <div class="row">
        <div class="text-center">Total Number of Responses: <strong><% total %></strong></div>
        <div class="col-lg-6 col-md-6 col-sm-6 text-center">
          <label class="pos-label">Dominant Professional Values</label></br>
          <p><% pv["0"]["name"] %> <strong><% pv["0"]["percent"] %>%</strong></p>
          <p><% pv["1"]["name"] %> <strong><% pv["1"]["percent"] %>%</strong></p>
          <p><% pv["2"]["name"] %> <strong><% pv["2"]["percent"] %>%</strong></p>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 text-center">
          <label class="neg-label">Least Dominant Professional Values</label></br>
          <p><% pv["8"]["name"] %> <strong><% pv["8"]["percent"] %>%</strong></p>
          <p><% pv["7"]["name"] %> <strong><% pv["7"]["percent"] %>%</strong></p>
          <p><% pv["6"]["name"] %> <strong><% pv["6"]["percent"] %>%</strong></p>
        </div>
      </div>
      <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 text-center">
        <label class="pos-label">Key Strengths</label></br>
        <p><% ks["0"]["name"] %> <strong><% ks["0"]["percent"] %>%</strong></p>
        <p><% ks["1"]["name"] %> <strong><% ks["1"]["percent"] %>%</strong></p>
        <p><% ks["2"]["name"] %> <strong><% ks["2"]["percent"] %>%</strong></p>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 text-center">
        <label class="neg-label">Caution Areas</label></br>
        <p><% ca["0"]["name"] %> <strong><% ca["0"]["percent"] %>%</strong></p>
        <p><% ca["1"]["name"] %> <strong><% ca["1"]["percent"] %>%</strong></p>
        <p><% ca["2"]["name"] %> <strong><% ca["2"]["percent"] %>%</strong></p>
      </div>
      </div>
    </div>
  `
})

var sumapp = new Vue({
  el:"#summaryapp",
  data(){
    return{
      pv:{},
      ks:{},
      ca:{},
      total:0,
      vueInstitution:"",
      vueSchool:[],
      vueProgram:[],
      vueRace:[],
      vueGender:"",
      vueIncome:"",
      vueFirst:"",
      vueAttendance:""
    }
  },
  computed:{
    isChanged(){
      return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      console.log("sumapp isChanged")
      this.fetchData();
      console.log("sumapp isChanged after fetchData")
      // console.log(this.pv)
      // console.log(dvVue.d3Data)
      // dvVue.d3Data = this.pv;
      // console.log(this.pv)
      // console.log(dvVue.d3Data)
    }
  },
  // created: function(){
  // //   this.fetchData();
  //   console.log("fetchapp created")
  // },
  methods:{
    fetchData:function(){
      var link = window.produceLink(this);
      // console.log("sumapp link")
      // console.log(link)
      // console.log("vueInstitution")
      // console.log(vueInstitution)
      fetch(link)
        .then(response=>response.json())
        .then(json=>{
          console.log("sumapp fetchData method")
          this.pv = json.data["0"]["Dominant Values"]
          console.log(this.pv)
          console.log(dvVue.d3Data)
          dvVue.d3Data = this.pv;
          console.log(this.pv)
          console.log(dvVue.d3Data)
          this.ks = json.data["0"]["Key Strengths"]
          this.ca = json.data["0"]["Caution Areas"]
          this.total = json.data["0"]["total"]
        })
    }
  }
})
