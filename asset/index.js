define(['zepto','oxjs'], function (undef,OXJS) {

    return {
        init: function ($mod) {
            var tpl = $('.J_tpl').html();
            var btDel = $('.J_del', $mod).on('click', function () {
                OXJS.confirm('确认删除?',function(re){
                    if (re) {
                        var ids = [];
                        $('.J_list>.selected', $mod).each(function () {
                            ids.push(this.getAttribute('data-id'))
                        });
                        if(ids.length){
                            $mod.OXDelete({
                                customize:{
                                    _id:ids.toString(),
                                    $deleter:'batch'
                                }

                            },function(r){
                                if (r.code == 0) {
                                    $('.J_list>.selected', $mod).remove();
                                    location.reload()
                                } else {
                                    alert(r.error)
                                }
                            });


                        }
                                            
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

        }
    }
})
