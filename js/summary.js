var sum = Vue.component('sum',{
  props:['pv','ks','ca',"total"],
  delimiters:["<%", "%>"],
  template:`
    <div class="hero-italic">
      <div class="row">
        <div class="text-center">Total Number of Responses: <% total %></div>
        <div class="col-lg-6 col-md-6 col-sm-6 text-center">
          <lable>Dominant Professional Values</label></br>
          <p><% pv["0"]["name"] %> <% pv["0"]["percent"] %>%<p>
          <p><% pv["1"]["name"] %> <% pv["1"]["percent"] %>%<p>
          <p><% pv["2"]["name"] %> <% pv["2"]["percent"] %>%<p>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 text-center">
          <lable>Least Dominant Professional Values</label></br>
          <p><% pv["8"]["name"] %> <% pv["8"]["percent"] %>%<p>
          <p><% pv["7"]["name"] %> <% pv["7"]["percent"] %>%<p>
          <p><% pv["6"]["name"] %> <% pv["6"]["percent"] %>%<p>
        </div>
      </div>
      <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 text-center">
        <lable>Key Strengths</label></br>
        <p><% ks["0"]["name"] %> <% ks["0"]["percent"] %>%<p>
        <p><% ks["1"]["name"] %> <% ks["1"]["percent"] %>%<p>
        <p><% ks["2"]["name"] %> <% ks["2"]["percent"] %>%<p>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 text-center">
        <lable>Caution Areas</label></br>
        <p><% ca["0"]["name"] %> <% ca["0"]["percent"] %>%<p>
        <p><% ca["1"]["name"] %> <% ca["1"]["percent"] %>%<p>
        <p><% ca["2"]["name"] %> <% ca["2"]["percent"] %>%<p>
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
      return [this.vueInstitution, this.vueSchool, this.vueProgram, this.vueGender,this.vueRace,this.vueFirst,this.vueIncome,this.vueAttendance].join();
    }
  },
  watch: {
    isChanged() {
      this.fetchData();
    }
  },
  created: function(){
    this.fetchData();
  },
  methods:{
    fetchData:function(){
      var link = window.produceLink(this);
      fetch(link)
        .then(response=>response.json())
        .then(json=>{
          this.pv = json.data["0"]["Dominant Values"]
          this.ks = json.data["0"]["Key Strengths"]
          this.ca = json.data["0"]["Caution Areas"]
          this.total = json.data["0"]["total"]
        })
    }
  }
})
