var fetchCount = 0;

function produceLink(that){
  // if (that.vueSchool.constructor === Array) that.vueSchool.sort();
  // if (that.vueProgram.constructor === Array) that.vueProgram.sort();
  // if (that.vueRace.constructor === Array) that.vueRace.sort();
  //
  var prelink = "https://betterweekdays.github.io/gates/data/";
  //
  // for (i=0; i<that.vueSchool.length;i++){
  //   prelink = prelink + "school=" + that.vueSchool[i]+"&"
  // }
  //
  // for (i=0; i<that.vueProgram.length;i++){
  //   prelink = prelink + "program=" + that.vueProgram[i]+"&"
  // }
  //
  // for (i=0; i<that.vueRace.length;i++){
  //   prelink = prelink + "race=" + that.vueRace[i]+"&"
  // }

  if (that.vueInstitution) prelink = prelink + "institution=" + that.vueInstitution+"&"
  // if (that.vueGender) prelink = prelink + "gender=" + that.vueGender+"&"
  // if (that.vueIncome) prelink = prelink + "income=" + that.vueIncome+"&"
  // if (that.vueFirst) prelink = prelink + "first=" + that.vueFirst+"&"
  // if (that.vueAttendance) prelink = prelink + "attendance=" + that.vueAttendance+"&"
  var link = prelink.substring(0, prelink.length-1)+".json"
  //for testing purpose
  // if (link !== "https://betterweekdays.github.io/gates/data/school=A&program=B&race=C&gender=A&income=B&first=C&attendance=A.json" && link !== "https://betterweekdays.github.io/gates/data/school=B&program=B&race=C&gender=C&income=A&first=A&attendance=A.json"){
  //   link = "https://betterweekdays.github.io/gates/data/testdata.json";
  // }
  window.fetchCount++;
  console.log(window.fetchCount)
  console.log(link)
  return link;
}
