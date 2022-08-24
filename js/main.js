(function($) {

  $(document).ready(function(){
    initializeFunctions();
  });

  function populateCityDropDown(){
    var results = $.getJSON("cities.json", function(data) {
      for(var i = 0; i < data.length; i++) {
          $("#city").append('<option value="' + data[i].name + '">' + data[i].name + '</option');
      }
    });
  }

  function resetButtonFunctionality(){
    $(".reset").click(function(){
      $("#register-form").trigger("reset");
    });
  }

  function populateStateDropDown(){
    var results = $.getJSON("states.json", function(data){
      for(var i = 0; i < data.length; i++){
        $("#state").append('<option value="' + data[i] + '">' + data[i] + '</option');
      }
    });
  }

  function initializeFunctions(){
    populateStateDropDown(); 
    populateCityDropDown(); 
    resetButtonFunctionality();
    submitButtonFunctionality();
  }

})(jQuery);