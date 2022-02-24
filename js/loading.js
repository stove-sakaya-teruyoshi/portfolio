$(function(){
  // let countFadeOut = 0;
  // let contents = [$("#header"), $("#main"), $("#sidebar"), $("#footer")];
  // let progress = [$("#progress-header"), $("#progress-main"), $("#progress-sidebar"), $("#progress-footer")];
  
  // function cmp () {
  //   $(".loading").delay(1000).fadeOut(2000);
  //   $(".contents").delay(2500).fadeIn(1000);
  // }
  
  // function elmLoaded (elm) {
  //   elm.fadeOut(1000);
  //   countFadeOut++;
  //   if (progress.length >= countFadeOut) {
  //     cmp();
  //   }
  // }

  // $.each(contents, function (index, value) {
  //   value.on("load", elmLoaded(progress[index]));
  // });

  function cmp () {
    $(".loading").fadeOut(2000);
    $(".contents").delay(2000).fadeIn(1000);
  }

  $(window).on("load", cmp());
});