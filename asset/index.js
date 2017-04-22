define(['zepto', 'mustache'], function (undef, Mustache) {
    var timeformat = function (d) {
        if (typeof d != 'object') {
            d = new Date(d);
        }
        var prefix0 = function (n) {
            return (n / 100).toFixed(2).substr(2)
        };
        return [d.getFullYear(), prefix0(d.getMonth() + 1), prefix0(d.getDate())].join('-') + ' ' + [d.getHours(), prefix0(d.getMinutes()), prefix0(d.getSeconds())].join(':')
    };

    return {
        init: function ($mod) {
            var tpl = $('.J_tpl').html();
            $.getJSON('http://www.shaomachetie.com/smct/getbuilds?callback=?', function (r) {
                var list = r.data;
                var totalfee = 0;

                if (list.length) {
                    for (var i = 0, n; n = list[i++];) {
                        totalfee += n.price;
                        n.time = timeformat(n.cts)
                    }
                    //r.data=list.slice(0,4)
                    r.extcls = list % 2 ? '' : 'fix-flex';
                    r.showtopbar = r.data.length > 4;
                    $mod.html(Mustache.render(tpl, r));
                } else {
                    $mod.html('<div class="empty"><i class="iconfont" style="font-size:50px;color:#ccc;">&#xe631;</i>&nbsp;&nbsp;<br/>作品栏是空的,赶紧去定制一个你喜欢的车贴吧~<br/><a href="'+$mod.attr('data-shopcart')+'">开始定制 &raquo;</a><br/><br/></div>')
                }


                var btDel = $('.J_del', $mod).on('click', function () {
                        if (confirm('确认删除?')) {
                            var ids=[];
                            $('.J_list>.selected', $mod).each(function(){
                                ids.push(this.getAttribute('data-id'))
                            })

                            $.getJSON('http://www.shaomachetie.com/smct/delbuild?ids='+ids.join(',')+'&callback=?',function(r){
                                if(r.code==0) {
                                    $('.J_list>.selected', $mod).remove();
                                }else{
                                    alert(r.error)
                                }
                            });
                        }
                    }),
                    btOrder = $('.J_order', $mod).on('click', function () {
                        var ids=[];
                        $('.J_list>.selected', $mod).each(function(){
                            ids.push(this.getAttribute('data-id'))
                        })

                        location.href=$mod.attr('data-shopcart')+'?bids='+ids.join(',')
                    });
                $($mod).on('click', '.snapshot', function (e) {
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

                });
            });
        }
    }
})
