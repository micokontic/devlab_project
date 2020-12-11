var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

showPage = function (pagination) {
    nombrePage = $(".content").length;
  if (pagination < 0 || pagination >= nombrePage) return;

  $(".content").hide().eq(pagination).show();
  $("#pagin li").removeClass("active").eq(pagination).addClass("active");
};

function setPaginationHandlers(){
// Go to Left
$(".prev").click(function () {
    showPage($("#pagin ul .active").index() - 1);
  });
  
  // Go to Right
  $(".next").click(function () {
    showPage($("#pagin ul .active").index() + 1);
  });
  
  $("#pagin ul a").click(function (e) {
    e.preventDefault();
    showPage($(this).parent().index());
  });
}