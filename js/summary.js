//a (kind of hard coded) component for Assessment Result Summary in the hero section
//this component is also responsible for data fetching
var sum = Vue.component('sum',{
  props:['pv','ks','ca','jf','mr','oc','la','sk',"total"],
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
      jf:{},
      mr:{},
      oc:{},
      la:{},
      sk:{},
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
      this.fetchData();
    }
  },
  // created: function(){
  //   this.fetchData();
  // },
  methods:{
    fetchData:function(){
      var link = window.produceLink(this); //the produceLink function is in link.js
      fetch(link)
        .then(response=>response.json())
        .then(json=>{
          this.pv = json.data["0"]["Dominant Values"]
          dvVue.d3Data = this.pv
          this.ks = json.data["0"]["Key Strengths"]
          ksVue.d3Data = this.ks
          this.ca = json.data["0"]["Caution Areas"]
          caVue.d3Data = this.ca
          this.jf = json.data["0"]["Job Functions"]
          jfVue.d3Data = this.jf
          this.mr = json.data["0"]["Model Roles"]
          mrVue.d3Data = this.mr
          this.oc = json.data["0"]["Organization Culture"]
          ocVue.d3Data = this.oc
          this.la = json.data["0"]["Leadership Anchors"]
          laVue.d3Data = this.la
          this.sk = json.data["0"]["Success Keys"]
          skVue.d3Data = this.sk
          this.total = json.data["0"]["total"]
        })
    }
  }
})
