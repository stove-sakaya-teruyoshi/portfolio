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

  let canChange = true;
  function change (prev, next) {
    canChange = false;
    $(".chooser li:nth-child(" + prev + ")").toggleClass("active");
    $(".chooser li:nth-child(" + next + ")").toggleClass("active");
    $(".slider li:nth-child(" + prev + ")").fadeOut(800);
    $(".slider li:nth-child(" + next + ")").fadeIn(1000);
    setTimeout(function(){ canChange = true; }, 600);
  }

  function cmp () {
    $(".loading").fadeOut(2000);
    $(".contents").delay(2000).fadeIn(1000);
  }

  $(window).on("load", cmp());

  let l = 0;
  $(".chooser li").click(function() {
    if (canChange) {
      let n = $(".chooser li").index(this);
      if (n != l) {
        change(l+1, n+1);
        l = n;
      }
    }
  });
});