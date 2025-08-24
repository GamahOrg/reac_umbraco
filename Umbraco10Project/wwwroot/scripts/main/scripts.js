/* Functions Definition */

/* On Ready */
$(function () {
  $(".checkbox-filter-regulatory").on("change", function () {
    arr = [];
    arrItems = [];
    $(".regulatory-framework-box-container").hide();

    $(".checkbox-filter-regulatory:checkbox[name=checkboxFilter]:checked").each(
      function () {
        arr.push($(this).val());
        $(
          ".regulatory-framework-box-container[data-value=" +
            $(this).val() +
            "]",
        ).show();
      },
    );

    let shownSubs = $(".regulatory-framework-box-container").filter(
      (_, e) => e.style.display != "none",
    );

    if (arr.length == 0 || shownSubs.length == 0) {
      $(".regulatory-framework-box-container").hide();
      $(".no-content").show();
    } else {
      $(".no-content").hide();
    }
  });
});

//complaint form page get the city
// $(document).ready(function () {
//     const url = new URL(window.location.href);
//     const host = url.origin;
//
//     $.getJSON(host + '/JsonFile/cities.json', function (jsonData) {
//         populateCities($("#regionSelect").val());
//
//         $("#regionSelect").change(function () {
//             var selectedRegion = $(this).val();
//
//             populateCities(selectedRegion);
//         });
//
//         function populateCities(region) {
//             var filteredData = jsonData.filter(function (item) {
//                 return item.region_en === region;
//             });
//
//             $("#citySelect").empty();
//             filteredData.forEach(function (item) {
//                 var cityOption = $("<option>").val(item.city_ar).text(item.city_ar);
//                 $("#citySelect").append(cityOption);
//             });
//         }
//
//
//         populateUmbracoFormsCities($(".umbraco-forms-region-dropdown").val());
//
//         $(".umbraco-forms-region-dropdown").change(function () {
//             var selectedRegion = $(this).val();
//
//             populateUmbracoFormsCities(selectedRegion);
//         });
//
//         function populateUmbracoFormsCities(region) {
//             var filteredData = jsonData.filter(function (item) {
//                 return item.region_en === region;
//             });
//
//             $(".umbraco-forms-city-dropdown").empty();
//             filteredData.forEach(function (item) {
//                 var cityOption = $("<option>").val(item.city_ar).text(item.city_ar);
//                 $(".umbraco-forms-city-dropdown").append(cityOption);
//             });
//         }
//     });
// });

// Add this script to your website
function toggleBlackAndWhite() {
  document.body.classList.toggle('black-and-white');
  // Optionally save the user's choice in localStorage
  if (document.body.classList.contains('black-and-white')) {
    sessionStorage.setItem('blackAndWhiteMode', 'enabled');
  } else {
    sessionStorage.removeItem('blackAndWhiteMode');
  }
}

// Default font size in percentage
let fontSize = 100; // 100% corresponds to the default font size

function increaseFontSize() {
  fontSize += 10; // Increase by 10%
  if (fontSize > 150) fontSize = 150; // Set a minimum font size

  document.body.style.fontSize = fontSize + '%';
  // Optionally save the user's preference
  sessionStorage.setItem('fontSize', fontSize);
}

function decreaseFontSize() {
  fontSize -= 10; // Decrease by 10%
  if (fontSize < 50) fontSize = 50; // Set a minimum font size
  document.body.style.fontSize = fontSize + '%';
  sessionStorage.setItem('fontSize', fontSize);
}

// Apply saved mode on page load
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('blackAndWhiteMode') === 'enabled') {
    document.body.classList.add('black-and-white');
  }

  const savedFontSize = sessionStorage.getItem('fontSize');
  if (savedFontSize) {
    document.querySelectorAll("h1, h2, h3, h4, h5, h6,.h1,.h2,.h3,.h4,.h5,.h6, .content p, .content span, .btn").forEach(item => {
      item.style.setProperty("font-size", "inherit", "important");
    });
    fontSize = parseInt(savedFontSize, 10);
    document.body.style.fontSize = fontSize + '%';
  }
});




document.addEventListener('click', function (event) {
  // Find the closest element with the 'onclick' class
  const button = event.target.closest('.onclick');

  // If no such element is found, exit
  if (!button) return;

  // Get the action and target from the button's data attributes
  const action = button.getAttribute('data-action');
  const value = button.getAttribute('data-value');

  // Handle actions dynamically
  switch (action) {
    case 'redirect':
      if (value) {
        window.location.href = value;
      } else {
        console.error('No target specified for redirect action.');
      }
      break;
    case 'redirect-new-tab':
      if (value) {
        window.open(value, '_blank');
      } else {
        console.error('No target specified for redirect action.');
      }
      break;
    default:
      console.warn(`Unknown action: ${action}`);
  }
});