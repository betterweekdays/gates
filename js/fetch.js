var fetch = Vue.component('fetch',{
  props:['tempdata'],
  delimiters:["<%", "%>"],
  template:`
    <div>
      Temp display of data:
      <% tempdata %>
    </div>
  `
})

var fetchapp = new Vue({
  el:"#fetchapp",
  data(){
    return{
      tempdata:{},
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
          this.tempdata = json.data["0"]["Dominant Values"]
        })
    }
  }
})
