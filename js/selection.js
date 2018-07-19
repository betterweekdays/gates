var selectcpo = Vue.component('v-select', VueSelect.VueSelect)

var maincpo = Vue.component('main-cpo',{
  props:{
    school:{
      default: function () {
        return ["A"]
        }
    },
    program:{
      default: function () {
        return ['A']
      }
    },
    race:{
      default: function () {
        return ['A']
      }
    },
    gender:{
      default:'A'
    },
    income:{
      default:'A'
    },
    first:{
      default:'A'
    },
    attendance:{
      default:'A'
    }
  },
  created(){
    //for disabling other selections upon attendance
    this.school_selected = this.schoolarr
    this.program_selected = this.programarr
    this.race_selected = this.racearr
    if (this.attendance_selected == "C"){
      this.disableUponAttendance()
    }

    //for fetching data for options
    fetch ("https://betterweekdays.github.io/gates/data/school.json")
      .then (response => response.json())
      .then (data =>{
        this.schooloptions = data
        this.schooloptions.unshift("A")
      })
  },
  watch:{
    attendance:function(){
      if (this.attendance_selected == "C"){
        this.disableUponAttendance()
      } else {
        this.enableUponAttendance()
      }
    }
  },
  data(){
    return{
      school_selected:this.school,
      program_selected:this.program,
      race_selected:this.race,
      gender_selected:this.gender,
      income_selected:this.income,
      first_selected:this.first,
      attendance_selected:this.attendance,
      schooloptions:[],
      programoptions:['A','B','C'],
      genderoptions:['A','B','C'],
      raceoptions:['A','B','C'],
      incomeoptions:['A','B','C'],
      firstoptions:['A','B','C'],
      attendanceoptions:['A','B','C'],
      schoolnodrop: false,
      programnodrop: false,
      racenodrop: false,
      gendernodrop: false,
      firstnodrop: false,
      incomenodrop: false
    }
  },
  components:{
    selectcpo
  },
  delimiters:["<%","%>"],
  template:`
    <div>
      <h1>School:</h1>
      <v-select multiple v-model="school_selected" :options="schooloptions" @input="updateSchool" :close-on-select="false" :no-drop="schoolnodrop"></v-select>

      <h1> Program of Study: </h1>
      <v-select multiple v-model="program_selected" :options="programoptions" @input="updateProgram" :close-on-select="false" :no-drop="programnodrop"></v-select>

      <h1> Race: </h1>
      <v-select multiple v-model="race_selected" :options="raceoptions" @input="updateRace" :close-on-select="false" :no-drop="racenodrop"></v-select>

      <h1> Gender: </h1>
      <v-select v-model="gender_selected" :options="genderoptions" @input="updateGender" :no-drop="gendernodrop"></v-select>

      <h1> Income Status: </h1>
      <v-select v-model="income_selected" :options="incomeoptions" @input="updateIncome" :no-drop="incomenodrop"></v-select>

      <h1> First Generation Status: </h1>
      <v-select v-model="first_selected" :options="firstoptions" @input="updateFirst" :no-drop="firstnodrop"></v-select>

      <h1> Attendance Intensity: </h1>
      <v-select v-model="attendance_selected" :options="attendanceoptions" @input="updateAttendance"></v-select>
    </div>
  `,
  computed:{
    schoolarr(){
      var scharr = this.$route.query.school
      if (typeof scharr !== 'undefined') {
        return Array.isArray(scharr) ? scharr : [scharr]
      } else {
        return this.school
      }
    },
    programarr(){
      var progarr = this.$route.query.program
      if (typeof progarr !== 'undefined'){
        return Array.isArray(progarr) ? progarr : [progarr]
      } else {
        return this.program
      }
    },
    racearr(){
      var racearr = this.$route.query.race
      if (typeof racearr !== 'undefined'){
        return Array.isArray(racearr) ? racearr : [racearr]
      } else {
        return this.race
      }
    }
  },
  methods:{
    checkIfContainsAny(arr){
      if (arr.includes("A")) {
        return ["A"]
      } else if (!arr||arr.length===0){
        return ["A"]
      } else{
        return arr
      }
    },
    checkIfNull(str){
      if(str===null){
        return "A"
      } else{
        return str
      }
    },
    updateSchool(target){
      // console.log("*******updateSchool*******")
      target = this.checkIfContainsAny(target)
      this.$router.replace({
        query:{
          ...this.$route.query,
          school: target
        }
      })
      dvVue.vueSchool=target;
      ksVue.vueSchool=target;
      caVue.vueSchool=target;
      jfVue.vueSchool=target;
      mrVue.vueSchool=target;
      rpVue.vueSchool=target;
      ocVue.vueSchool=target;
      inVue.vueSchool=target;
      ogVue.vueSchool=target;
      asVue.vueSchool=target;
    },
    updateProgram(target){
      // console.log("*******updateProgram*******")
      target = this.checkIfContainsAny(target)
      this.$router.replace({
        query:{
          ...this.$route.query,
          program: target
        }
      })
      dvVue.vueProgram=target;
      ksVue.vueProgram=target;
      caVue.vueProgram=target;
      jfVue.vueProgram=target;
      mrVue.vueProgram=target;
      rpVue.vueProgram=target;
      ocVue.vueProgram=target;
      inVue.vueProgram=target;
      ogVue.vueProgram=target;
      asVue.vueProgram=target;
    },
    updateRace(target){
      // console.log("*******updateRace*******")
      target = this.checkIfContainsAny(target)
      this.$router.replace({
        query:{
          ...this.$route.query,
          race: target
        }
      })
      dvVue.vueRace=target;
      ksVue.vueRace=target;
      caVue.vueRace=target;
      jfVue.vueRace=target;
      mrVue.vueRace=target;
      rpVue.vueRace=target;
      ocVue.vueRace=target;
      inVue.vueRace=target;
      ogVue.vueRace=target;
      asVue.vueRace=target;
    },
    updateGender(target){
      // console.log("*******updateGender*******")
      target=this.checkIfNull(target)
      this.$router.replace({
        query:{
          ...this.$route.query,
          gender: target
        }
      })
      dvVue.vueGender=target;
      ksVue.vueGender=target;
      caVue.vueGender=target;
      jfVue.vueGender=target;
      mrVue.vueGender=target;
      rpVue.vueGender=target;
      ocVue.vueGender=target;
      inVue.vueGender=target;
      ogVue.vueGender=target;
      asVue.vueGender=target;
    },
    updateIncome(target){
      // console.log("*******updateIncome*******")
      target=this.checkIfNull(target)
      this.$router.replace({
        query:{
          ...this.$route.query,
          income: target
        }
      })
      dvVue.vueIncome=target;
      ksVue.vueIncome=target;
      caVue.vueIncome=target;
      jfVue.vueIncome=target;
      mrVue.vueIncome=target;
      rpVue.vueIncome=target;
      ocVue.vueIncome=target;
      inVue.vueIncome=target;
      ogVue.vueIncome=target;
      asVue.vueIncome=target;
    },
    updateFirst(target){
      // console.log("*******updateFirst*******")
      target=this.checkIfNull(target)
      this.$router.replace({
        query:{
          ...this.$route.query,
          first: target
        }
      })
      dvVue.vueFirst=target;
      ksVue.vueFirst=target;
      caVue.vueFirst=target;
      jfVue.vueFirst=target;
      mrVue.vueFirst=target;
      rpVue.vueFirst=target;
      ocVue.vueFirst=target;
      inVue.vueFirst=target;
      ogVue.vueFirst=target;
      asVue.vueFirst=target;
    },
    updateAttendance(target){
      // console.log("*******updateAttendance*******")
      target=this.checkIfNull(target)
      this.$router.replace({
        query:{
          ...this.$route.query,
          attendance: target
        }
      })
      dvVue.vueAttendance=target;
      ksVue.vueAttendance=target;
      caVue.vueAttendance=target;
      jfVue.vueAttendance=target;
      mrVue.vueAttendance=target;
      rpVue.vueAttendance=target;
      ocVue.vueAttendance=target;
      inVue.vueAttendance=target;
      ogVue.vueAttendance=target;
      asVue.vueAttendance=target;
    },
    disableUponAttendance(){
      this.school_selected = ["A"]
      this.schoolnodrop = true
      this.program_selected = ["A"]
      this.programnodrop = true
      this.race_selected = ["A"]
      this.racenodrop = true
      this.gender_selected = "A"
      this.gendernodrop = true
      this.first_selected = "A"
      this.firstnodrop = true
      this.income_selected = "A"
      this.incomenodrop = true
    },
    enableUponAttendance(){
      this.schoolnodrop = false
      this.programnodrop = false
      this.racenodrop = false
      this.gendernodrop = false
      this.firstnodrop = false
      this.incomenodrop = false
    }
  }
})

var router = new VueRouter({
  mode:'history',
  routes:[{
    path:'*',
    component:maincpo,
    props: (route)=>({
      school:route.query.school,
      program:route.query.program,
      race:route.query.race,
      gender:route.query.gender,
      income:route.query.income,
      first:route.query.first,
      attendance:route.query.attendance
    })
  }]
})

var app = new Vue({
  router,
  el: '#selectapp',
  components:{
    maincpo
  },
  render(h){
    return h('div',{
      attrs:{
        id:'selectapp'
      }
    },[
      h('h1','Soft Skills & Values Assessment'),
      h('router-view')
    ])
  }
})
