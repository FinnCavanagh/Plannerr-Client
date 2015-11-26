$(function(){
  var Views = Views || {}
  window.Views = Views
  Views.render = function(path, data, selector){
    console.log("HERE");
    $.ajax({url: path}).done(function(stringTemplate){
      var underscoreTemplate = _.template(stringTemplate);
      compiledTemplate = underscoreTemplate(data);
      $(selector).html(compiledTemplate);
    })
  }

  Views.renderCollection = function(path, collection, selector){

    $.ajax({url: path}).done(function(stringTemplate){
      var underscoreTemplate = _.template(stringTemplate);
      _(collection).each(function(item){
        compiledTemplate = underscoreTemplate(item);
        $(selector).append(compiledTemplate);
      })
      
    })
  }

  // Views.render("/templates/layout.html", null, "body");
});