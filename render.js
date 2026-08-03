// Shared renderer for all category pages + the hub.
// Set WeChat ID once here (fills any #wx element). Pages define window.CATS + window.ITEMS.
(function(){
  var WECHAT = "asurin1";
  var EMO = {desk:"🖥️", mon:"🖵", part:"🧩", furn:"🛋️", misc:"📦"};

  function card(it){
    var img = it.photo
      ? '<img class="ph" src="'+it.photo+'" alt="'+it.en+'" loading="lazy">'
      : '<div class="ph placeholder">'+(EMO[it.cat]||"📦")+'<small>照片稍后 photo soon</small></div>';
    var specs = it.specs.map(function(s){return "<li>"+s+"</li>";}).join("");
    var note = it.note ? '<div class="note">'+it.note+'</div>' : "";
    var ribbon = it.sold ? '<div class="soldribbon">已售 SOLD</div>' : "";
    var price = it.sold
      ? '<div class="price"><s>$'+it.price+'</s> <small>已售 SOLD</small></div>'
      : '<div class="price">$'+it.price+' <small>OBO</small></div>';
    return '<div class="card'+(it.sold?' sold':'')+'"><div class="cardwrap">'+ribbon+img+'</div>'
      + '<div class="body"><div class="name">'+it.zh+'<span class="en">'+it.en+'</span></div>'
      + price + '<ul class="specs">'+specs+'</ul>' + note + '</div></div>';
  }

  var app = document.getElementById("app");
  if (app && window.ITEMS) {
    var active = window.ITEMS.filter(function(i){return !i.sold;});
    var html = (window.CATS||[]).map(function(c){
      var items = active.filter(function(i){return i.cat===c[0];});
      if (!items.length) return "";
      return '<section><h2>'+c[1]+'<span class="en">'+c[2]+'</span></h2>'
           + '<div class="grid">'+items.map(card).join("")+'</div></section>';
    }).join("");
    var sold = window.ITEMS.filter(function(i){return i.sold;});
    if (sold.length) {
      html += '<section><h2>已售出<span class="en">Sold</span></h2>'
            + '<div class="grid">'+sold.map(card).join("")+'</div></section>';
    }
    app.innerHTML = html;
  }

  var wx = document.getElementById("wx");
  if (wx) wx.textContent = WECHAT;
})();
