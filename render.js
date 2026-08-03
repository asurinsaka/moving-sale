// Shared renderer. WeChat ID set once here. Pages provide window.ITEMS (+ window.CATS for listings).
// Listing page: element #app + window.CATS  → renders clickable cards linking to item.html?id=<id>
// Detail page:  element #detail            → renders one item from ?id=<id>
// Any page with #wx gets the WeChat ID filled in.
(function(){
  var WECHAT = "asurin1";
  var EMO = {desk:"🖥️", mon:"🖵", part:"🧩", furn:"🛋️", misc:"📦"};

  function ph(it, big){
    var cls = "ph" + (big ? " big" : "");
    return it.photo
      ? '<img class="'+cls+'" src="'+it.photo+'" alt="'+it.en+'"'+(big?"":' loading="lazy"')+'>'
      : '<div class="'+cls+' placeholder">'+(EMO[it.cat]||"📦")+'<small>照片稍后 photo soon</small></div>';
  }
  function priceHtml(it){
    return it.sold
      ? '<div class="price"><s>$'+it.price+'</s> <small>已售 SOLD</small></div>'
      : '<div class="price">$'+it.price+' <small>OBO</small></div>';
  }
  function listCard(it){
    var ribbon = it.sold ? '<div class="soldribbon">已售 SOLD</div>' : '';
    var specs = it.specs.slice(0,2).map(function(s){return "<li>"+s+"</li>";}).join("");
    return '<a class="card'+(it.sold?' sold':'')+'" href="item.html?id='+it.id+'">'
      + '<div class="cardwrap">'+ribbon+ph(it,false)+'</div>'
      + '<div class="body"><div class="name">'+it.zh+'<span class="en">'+it.en+'</span></div>'
      + priceHtml(it) + '<ul class="specs">'+specs+'</ul>'
      + (it.ai ? '<div class="aichip">🤖 可跑本地AI · Local-AI ready</div>' : '')
      + '<div class="more">查看详情 Details →</div></div></a>';
  }
  function detailView(it){
    var ribbon = it.sold ? '<div class="soldribbon">已售 SOLD</div>' : '';
    var specs = it.specs.map(function(s){return "<li>"+s+"</li>";}).join("");
    var note = it.note ? '<div class="note">'+it.note+'</div>' : '';
    var cond = it.cond ? '<div class="cond">品相 Condition：<b>'+it.cond+'</b></div>' : '';
    var desc = it.detail ? '<p class="desc">'+it.detail+'</p>' : '';
    var btn  = it.sold ? '' : '<a class="buybtn" href="#buy">我想要这个 / I want this →</a>';
    return '<div class="detailcard"><div class="cardwrap">'+ribbon+ph(it,true)+'</div>'
      + '<div class="dbody"><div class="dname">'+it.zh+'</div><div class="den">'+it.en+'</div>'
      + priceHtml(it) + cond + '<ul class="specs">'+specs+'</ul>' + note
      + (it.ai ? '<div class="aibox">'+it.ai+'</div>' : '') + desc + btn + '</div></div>';
  }

  // Listing
  var app = document.getElementById("app");
  if (app && window.ITEMS) {
    var active = window.ITEMS.filter(function(i){return !i.sold;});
    var html = (window.CATS||[]).map(function(c){
      var items = active.filter(function(i){return i.cat===c[0];});
      if (!items.length) return "";
      return '<section><h2>'+c[1]+'<span class="en">'+c[2]+'</span></h2>'
           + '<div class="grid">'+items.map(listCard).join("")+'</div></section>';
    }).join("");
    var sold = window.ITEMS.filter(function(i){return i.sold;});
    if (sold.length) html += '<section><h2>已售出<span class="en">Sold</span></h2>'
           + '<div class="grid">'+sold.map(listCard).join("")+'</div></section>';
    app.innerHTML = html;
  }

  // Detail
  var det = document.getElementById("detail");
  if (det && window.ITEMS) {
    var m = location.search.match(/[?&]id=([^&]+)/);
    var id = m ? decodeURIComponent(m[1]) : "";
    var it = window.ITEMS.filter(function(i){return i.id===id;})[0];
    if (it) { det.innerHTML = detailView(it); document.title = it.zh + " " + it.en + " · 搬家甩卖"; }
    else { det.innerHTML = '<p style="text-align:center;color:#66707c;padding:30px">未找到该商品 / Item not found. <a href="./">← 返回 Back</a></p>'; }
  }

  var wx = document.getElementById("wx");
  if (wx) wx.textContent = WECHAT;
})();
