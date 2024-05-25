$(document).ready(async function () {
  $(".category-btn").click(async function () {
    $(".main-category-block").find(".submenu_block").remove();
    let dataSub = $(this).attr("data-sub").replace(/'/g, '"');
    let subMenuData = JSON.parse(dataSub);
    let $subMenu = $('<ul class="submenu_block"></ul>');
    await buildSubMenu($subMenu, subMenuData);
    $(".main-category-block").append($subMenu);
    $(".active").addClass("removColor");
    $(".submenu_block").addClass("sbColor");
    $(this)
      .addClass("removColorBlock")
      .siblings()
      .removeClass("removColorBlock");
    $("#category-image").addClass("noneImg");

    $(".submenu_block").on("click", "li", function (e) {
      $(".submenu_block").removeClass("sbColor");
      e.stopPropagation();
      let currentSubmenu = $(this).children(".submenu_block").first();
      $(".submenu_block").removeClass("bord");
      if (currentSubmenu.is(":visible")) {
        $(this).parent(".submenu_block").removeClass("bord");
      } else {
        currentSubmenu.addClass("bord");
      }
      currentSubmenu.slideToggle();
      $(this).siblings().find(".submenu_block").slideUp();
      $(this).addClass("color").siblings().removeClass("color");
    });
  });

  function buildSubMenu($parent, data) {
    if (Array.isArray(data)) {
      data.forEach(function (item) {
        let $li = $("<li></li>");
        if (typeof item === "object") {
          if (item.name) $li.text(item.name);
          else buildSubMenu($li, item);
          $parent.append($li);
        }
      });
    } else if (typeof data === "object") {
      $.each(data, function (key, value) {
        $parent.text(key);
        let $ul = $('<ul class="submenu_block"></ul>');
        buildSubMenu($ul, value);
        $parent.append($ul);
      });
    }
  }

  $(".menu-icon").click(function () {
    $("#navbarMenu").toggleClass("show");
  });

  $(".mobile-search-icon").click(function () {
    let searchInput = $("#searchInput");
    if (searchInput.css("display") === "none") {
      searchInput.css("display", "block");
      searchInput.focus();
    } else {
      searchInput.css("display", "none");
    }
  });
});
