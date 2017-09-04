define(['zepto', 'mustache','oxjs'], function (undef, Mustache,OXJS) {
    var timeformat = function (d) {
        if (typeof d != 'object') {
            d = new Date(d);
        }
        var prefix0 = function (n) {
            return (n / 100).toFixed(2).substr(2)
        };
        return [d.getFullYear(), prefix0(d.getMonth() + 1), prefix0(d.getDate())].join('-') + ' ' + [d.getHours(), prefix0(d.getMinutes()), prefix0(d.getSeconds())].join(':')
    };
    var param2settings=function(param){
        if(!param)return {};
        var obj={};
        for(var i= 0,n;n=param[i++];){
            obj[n.label]= n.value;
        }//console.log(obj)
        return obj;
    };

    return {
        init: function ($mod) {
            var tpl = $('.J_tpl').html();
            var uid=$mod.attr('data-uid');


            var customizeRest = OXJS.useREST('customize/e0ee59439b39fcc3/u/' + encodeURIComponent(uid)).setDevHost('http://local.openxsl.com/');//md5('saomachetie')
            customizeRest.get( function (r) {
            //$.getJSON('//www.shaomachetie.com/smct/getbuilds?callback=?', function (r) {
                var list = r.data||r;


                if (list.length) {
                    var tpldata={};
                    for (var i = 0, n; n = list[i++];) {
                        n.time = timeformat(n.cts);
                        n.setting=param2settings(n.props);

                    }
                    tpldata.data=list;
                    //r.data=list.slice(0,4)
                    tpldata.extcls = list % 2 ? '' : 'fix-flex';
                    tpldata.showtopbar = list.length > 4;
                    tpldata.fullcarlogo = function () {

                        var str = ''
                        if (/\d+/.test(this)) {
                            str = 'cars/' + this + '.png'
                        } else {
                            str = 'carlogo/' + this + '.jpg'
                        }
                        return 'http://v.oxm1.cc/' + str
                    }
                    $mod.html(Mustache.render(tpl, tpldata));
                } else {
                    $mod.html('<div class="empty"><i class="iconfont" style="font-size:50px;color:#ccc;">&#xe631;</i>&nbsp;&nbsp;<br/>作品栏是空的,赶紧去定制一个你喜欢的车贴吧~<br/><a href="' + $mod.attr('data-build') + '">开始定制 &raquo;</a><br/><br/></div>')
                }


                var btDel = $('.J_del', $mod).on('click', function () {
                        OXJS.confirm('确认删除?',function(re){
                            if (re) {
                                var ids = [];
                                $('.J_list>.selected', $mod).each(function () {
                                    ids.push(this.getAttribute('data-id'))
                                });
                                //批量删除
                                customizeRest.del({ids:ids.join(',')},function(r){

                               // $.getJSON('//www.shaomachetie.com/smct/delbuild?ids=' + ids.join(',') + '&callback=?', function (r) {
                                    if (r.code == 0) {
                                        $('.J_list>.selected', $mod).remove();
                                        location.reload()
                                    } else {
                                        alert(r.error)
                                    }
                                });
                            }
                        })

                    }),
                    btOrder = $('.J_order', $mod).on('click', function () {
                        var ids = [];
                        $('.J_list>.selected', $mod).each(function () {
                            ids.push(this.getAttribute('data-id'))
                        })

                        location.href = $mod.attr('data-shopcart') + '?bids=' + ids.join(',')
                    });
                var lastClickTS=0;
                $mod.on('tap', '.snapshot', function (e) {
                    if(Date.now()-lastClickTS < 100){
                        return false
                    }
                    lastClickTS=Date.now();
                    $(this).toggleClass('selected');
                    var ck = $('input[type="checkbox"]', this)[0];
                    ck.checked = $(this).hasClass('selected');
                    var len = $('.J_list>.selected', $mod).length
                    $('.J_count', $mod).html(len)

                    if (len) {
                        btDel.removeAttr('disabled')
                        btOrder.removeAttr('disabled')
                    } else {
                        btDel.attr('disabled', 'disabled')
                        btOrder.attr('disabled', 'disabled')
                    }
                    return false

                });
            });
        }
    }
})
