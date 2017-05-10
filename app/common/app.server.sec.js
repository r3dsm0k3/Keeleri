var models = require('mongoose');
var async = require("async")

var modelinstancemaps = {}
models_=models.models

function instance_(modelname_,schemas){
  result={}
  async.each(schemas,function(scheme,cb){
    result[scheme.path]=scheme.instance
    cb()
  },function(res){
    modelinstancemaps[modelname_]=result
  });
}

async.each(models_,function(model_,cb){
  paths=model_.schema.paths
  instance_(model_.modelName,paths);
  cb();
},function(res){
});

function validate(model,value,key){
   var params = modelinstancemaps[model]
   for(var param in params){
     if(param.toLowerCase()===key.toLowerCase()){
         var success=false
         if (params[param]==="Number")
           success=number_(value)

         else if (params[param]==="Date")
           success=date_(value)

         else if (params[param]==="Array")
           success=array_(value,param)

         else if(params[param]==="String")
           success=string_(value)
        if(!success)
         return false
       else
         return true
       }else if(param){
       }
    }
}

exports.check_sec_shiz = function(model,value,key){
     return validate(model,value,key);
}

function string_(param){
  return !/[^@\.a-zA-Z0-9]/.test(param)
}

function number_(param){
  return (!/[^0-9]/.test(param))
}

function date_(param){
  try {
    var test = moment(param);
    if (test._d.toString()==="Invalid Date"){
        return false
    }
    else{
      return true
    }
  } catch (e) {
    return false
  }
}

function array_(value,param){
  // figure this out
  return true
}
