function serializeToJson(form){
    var result = {};
    var f = form.serializeArray()
    console.log(f)
    f.forEach(function(item){
        result[item.name]= item.value;
        console.log(item)
    });
    return result;
}