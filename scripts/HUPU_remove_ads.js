/*
 * 虎扑去广告 — Quantumult X 适配，2026-11-01
 * 原作者：ZenmoFeiShi https://github.com/ZenmoFeiShi
 * 原脚本：https://kelee.one/Resource/JavaScript/HUPU/HUPU_remove_ads.js
 * 原脚本注明引用：https://raw.githubusercontent.com/ZenmoFeiShi/Qx/main/HP.js
 * 保留原有清理项目；添加数据结构检查与异常时原样放行。
 */
(function () {
  var body = $response.body;
  try {
    var url = $request.url;
    var obj = JSON.parse(body);
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      $done({});
      return;
    }
    var changed = false;
    function removeField(target, key) {
      if (target && typeof target === "object" &&
          Object.prototype.hasOwnProperty.call(target, key)) {
        delete target[key];
        changed = true;
      }
    }
    if (url.indexOf("/buffer/hotList") !== -1) {
      removeField(obj.result, "topBanner");
    }
    if (url.indexOf("/mang/preview/banners") !== -1) {
      removeField(obj, "data");
    }
    var cards = obj.data && obj.data.cards;
    if (Array.isArray(cards)) {
      if (url.indexOf("/bbsallapi/lego/data") !== -1) {
        var removedTitles = ["个性换肤", "专家预测", "邀请好友", "版主中心", "JRs战术板", "草稿箱", "58同城"];
        cards.forEach(function (card) {
          if (!card || card.code !== "multiIcon" || !Array.isArray(card.components)) return;
          var filtered = card.components.filter(function (component) {
            return !(component && component.data && removedTitles.indexOf(component.data.title) !== -1);
          });
          if (filtered.length !== card.components.length) {
            card.components = filtered;
            changed = true;
          }
        });
      }
      var keptCards = cards.filter(function (card) {
        return !(card && Array.isArray(card.components) && card.components.some(function (component) {
          return component && component.data && component.data.title === "我的应用";
        }));
      });
      if (keptCards.length !== cards.length) {
        obj.data.cards = keptCards;
        changed = true;
      }
    }
    if (url.indexOf("/bplapi/user/v1/more") !== -1) {
      removeField(obj.result, "vipInfo");
    }
    $done(changed ? { body: JSON.stringify(obj) } : {});
  } catch (error) {
    console.log("[虎扑去广告] 数据格式不符，保留原响应：" + error.message);
    $done({});
  }
})();
