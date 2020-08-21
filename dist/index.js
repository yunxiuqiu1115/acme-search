$(document).ready(function () {
  $.ajaxSetup({ cache: false });
  $(".search-icon").on("click", function () {
    $(".loading").hide();
    $("#result").html("");
    $("#state").val("");
    let searchField = $("#search").val();
    let expression = searchField;
    $.getJSON("data.json", function (data) {
      $.each(data, function (key, value) {
        if (value.matching_terms.includes(expression)) {
          let text = "";
          for (const key of Object.keys(value)) {
            if (key === "matching_terms") continue;
            text +=
              "<b style='color:#800020'>" + key + ": </b>" + value[key] + " | ";
          }
          $("#result").append(
            '<li class="list-group-item link-class"> ' +
              " " +
              text +
              " " +
              '<button class="deleteMe">Remove</button>' +
              '<button class="markMe">Mark</button>' +
              '<button class="unmarkMe">Unmark</button>' +
              '<button class="pinMe">Pin</button></li>'
          );
        }
      });
    });
  });

  $("#result").on("click", "li", function () {
    $(".deleteMe").on("click", function () {
      $(this).closest("li").remove();
    });
    const text = $(this).text();

    $(".markMe").on("click", function () {
      $(this).closest("li").css("background-color", "#fac7b4");
      $(this).hide();
      $(this).closest("li").children(".unmarkMe").show();
    });

    $(".unmarkMe").on("click", function () {
      $(this).closest("li").css("background-color", "#fff");
      $(this).hide();
      $(this).closest("li").children(".markMe").show();
    });
    let click_text = $(this).text().split("|");
    $(".pinMe").on("click", function () {
      $("#search").val($.trim(click_text[0]));
      $("#result").html("");
      $(".loading").show();
    });
  });
});
