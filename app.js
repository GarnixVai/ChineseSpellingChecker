'use strict';

(function() {
  // API_URL = 'http://nlp-ryze.cs.nthu.edu.tw:1214/translate/'
  //var API_URL = 'https://fathomless-wave-32876.herokuapp.com/messages';
  var API_URL = 'https://fathomless-wave-32876.herokuapp.com/translate';
  var HEADERS = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };
  var loadingMask = null;

  // The initialize function is run each time the page is loaded.
  Office.initialize = function(reason) {

    $(document).ready(function() {
      // Use this to check whether the API is supported in the Word client.
      if (Office.context.requirements.isSetSupported('WordApi', 1.1)) {
        Office.context.document.addHandlerAsync('documentSelectionChanged',
            detectChange, // handler
            function(result) {} // callback
        );
        loadingMask = $('#loading-mask');
        loadingMask.hide();
        $('#supportedVersion').html('This code is using Word 2016 or greater.');
      }
      else {
        $('#supportedVersion').html('This code requires Word 2016 or greater.');
      }
    });
  };

  function detectChange(eventArgs) {
    eventArgs.document.getSelectedDataAsync(
        Office.CoercionType.Text,
        function(asyncResult) {
          if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            console.error('Action failed. Error: ' +
                asyncResult.error.message);
          } else if (asyncResult.value.trim()) {
            request(asyncResult.value); // get content and ajax
          }
        });
  }

  function request(query) {
    $('#select-sec').html(query);
    $.ajax({
      type: 'POST',
      url: API_URL,
      data: JSON.stringify({text: query}),
      dataType: 'json',
      headers: HEADERS,
      beforeSend: function() {loadingMask.show();},
      complete: function() {loadingMask.hide();},
      success: function(res){
      //   $('#correct-sec').html("answer:"+ res.result);
         var content = res.result.replace(/\[-(.*?)-\]/g,
        '<span class="deletion">$1</span>').
        replace(/\{\+(.+?)\+\}/g, '<span class="correction">$1</span>');

         $('#correct-sec').html(content);
      },
      error: function(XMLHttpRequest) {
        console.error(XMLHttpRequest);
        $('#correct-sec').html('Something wrong, please reopen it.');
      },
    });
  }

  function showCorrect(data) {
    $('#correct-sec').html(data);
    // var content = data.word_diff.replace(/\[-(.*?)-\]/g,
    //     '<span class="deletion">$1</span>').
    //     replace(/\{\+(.+?)\+\}/g, '<span class="correction">$1</span>');

    // $('#correct-sec').html(content);
  }
})();