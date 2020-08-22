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
            if (key === "matching_terms" || key === "index") continue;
            text +=
              "<b style='color:#800020'>" + key + ": </b>" + value[key] + " | ";
          }
          let set = {};
          if (localStorage.getItem("favorites") != null)
            set = JSON.parse(localStorage.getItem("favorites"));
          let entry =
            '<li class="list-group-item link-class"> ' +
            " " +
            text +
            " " +
            '<button class="addMe" id="addMe' +
            value["index"] +
            '">Add</button>' +
            '<button class="deleteMe">Remove</button>' +
            '<button class="markMe">Mark</button>' +
            '<button class="unmarkMe">Unmark</button>' +
            '<button class="pinMe">Pin</button></li>';
          if (set.hasOwnProperty("addMe" + value["index"])) {
            entry =
              " " +
              text +
              " " +
              '<button class="deleteMe">Remove</button>' +
              '<button class="markMe">Mark</button>' +
              '<button class="unmarkMe">Unmark</button>' +
              '<button class="pinMe">Pin</button></li>';
          }
          $("#result").append(entry);
        }
      });
    });
  });

  $("#result").on("click", "li", function () {
    $("li").on("click", ".addMe", function () {
      let favorites;
      if (localStorage.getItem("favorites") != null) {
        favorites = JSON.parse(localStorage.getItem("favorites"));
      } else {
        favorites = {};
      }

      favorites[`${$(this).attr("id")}`] = $(this).closest("li").text();
      $(this).hide();
      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    $("li").on("click", ".deleteMe", function () {
      $(this).closest("li").remove();
    });
    const text = $(this).text();

    $("li").on("click", ".markMe", function () {
      $(this).closest("li").css("background-color", "#fac7b4");
      $(this).hide();
      $(this).closest("li").children(".unmarkMe").show();
    });

    $("li").on("click", ".unmarkMe", function () {
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
