

map = function() {
  var longitude = Math.floor(this.location.longitude);
  emit({
    longitude: longitude});}


reduce = function(){
  var same = [];
  var longitude = Math.floor(this.location.longitude);
  var count = 0;

  if(smae.includes(longitude)){
    count+= 1;
  }else{
    same.push(longitude);
  }

  return { count : count };
}

results = db.runCommand({
  mapReduce: 'cities',
  map: map,
  reduce: reduce,
  out: 'cities.report'
})

//mapreduce query
// db.cities.report.find()


