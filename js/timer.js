$(function () {
  // 数値をいじる要素の羅列
  let elms = [$(".m.left .num").get(0), $(".m.right .num").get(0), $(".s.left .num").get(0), $(".s.right .num").get(0)];
  let max = [9, 9, 5, 9];
  // タイマーストップ用フラグ
  let isStop = true;

  /** カウントアップ可否確認 */
  function compareMax (elm) {
    let index = $.inArray(elm, elms);
    let n = Number($(elm).text());
    if (n+1 <= max[index]) {
      return true;
    } else {
      if (0 < index) {
        return compareMax(elms[index - 1]);
      } else {
        return false;
      }
    }
  }

  /** カウントアップ実行 */
  function excCountUp (elm) {
    let index = $.inArray(elm, elms);
    let n = Number($(elm).text());
    if (n+1 <= max[index]) {
      $(elm).text(n+1);
    } else {
      $(elm).text(0);
      if (0 < index) {
        excCountUp(elms[index - 1]);
      }
    }
  }

  /** カウントアップ */
  function countUp(elm) {
    if (compareMax(elm)) {
      excCountUp(elm);
    }
  }

  /** カウントダウン可否確認 */
  function compareMin (elm) {
    let index = $.inArray(elm, elms);
    let n = Number($(elm).text());
    if (0 < n) {
      return true;
    } else {
      if (0 < index) {
        return compareMin(elms[index - 1]);
      } else {
        return false;
      }
    }
  }

  /** カウントダウン実行 */
  function excCountDown (elm) {
    let index = $.inArray(elm, elms);
    let n = Number($(elm).text());
    if (0 < n) {
      $(elm).text(n-1);
    } else {
      $(elm).text(max[index]);
      if (0 < index) {
        excCountDown(elms[index - 1]);
      }
    }
  }

  /** カウントダウン */
  function countDown(elm) {
    if (compareMin(elm)) {
      excCountDown(elm);
      return true;
    } else {
      return false;
    }
  }

  /** カウントダウンループ */
  function loopCountDown() {
    let f = countDown($(".s.right .num").get(0));
    if (f && !isStop) {
      setTimeout(loopCountDown, 1000);
    } else if (!f) {
      timerButton();
    }
  }

  /** タイマーボタン処理 */
  function timerButton() {
    let startBtn = $(".start-btn");
    if (startBtn.hasClass("start")) {
      setTimeout(loopCountDown, 1000);
    }
    isStop = !isStop;
    startBtn.find(".start-btn-icon").toggle();
    $(".btn-up, .btn-down").toggle();
    startBtn.toggleClass("stop");
    startBtn.toggleClass("start");
  }

  /** カウントアップボタン押下処理 */
  $(".btn-up").click(function () {
    let num = $(this).parent().find(".num").get(0);
    countUp(num);
  });

  /** カウントダウンボタン押下処理 */
  $(".btn-down").click(function () {
    let num = $(this).parent().find(".num").get(0);
    countDown(num);
  });

  /** タイマースタートボタン押下処理 */
  $(".start-btn").click(function () {
    timerButton();
  });
});