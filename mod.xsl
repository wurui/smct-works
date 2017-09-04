<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:oxm="https://www.openxsl.com">
    <xsl:template match="/root" name="wurui.smct-works">
        <xsl:param name="actionShopcart"></xsl:param>
        <xsl:param name="actionBuild"></xsl:param>
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-smct-works" ox-mod="smct-works" data-uid="{login/uid}" data-shopcart="{$actionShopcart}" data-build="{$actionBuild}">
            <div class="loading">加载中...</div>

        </div>

        <script type="text/tpl" class="J_tpl"><![CDATA[

            {{#showtopbar}}
            <div class="listbar">
                <span>
                    &nbsp;&nbsp;已选中 <span class="J_count">0</span>/{{data.length}}
                    <button class="bt-del J_del" disabled="disabled">删除已选</button>
                </span>
                <span>
                    <button class="bt-order J_order" disabled="disabled">结算</button>
                </span>
            </div>
            {{/showtopbar}}
            <div class="list J_list {{extcls}}">
            {{#data}}
            <div class="snapshot" data-id="{{_id}}" title="点击可选中">
                <div class="snapshot-op">
                    <p>{{time}}</p>
                    <span class="status status-{{status}}"></span>
                    <p class="radio">
                        <input type="checkbox" name="preview" value="{{_id}}"/>
                    </p>
                </div>
                <div class="preview bgcolor-{{setting.bgcolor}}"">
                    <div class="card-header">{{setting.text1}}</div>
                    <div class="card-body tpl tpl-{{setting.tpl}}">
                        <div class="central">
                            {{#setting.carlogo}}<img src="{{fullcarlogo}}"/>{{/setting.carlogo}}
                        </div>
                        <img src="http://i.oxm1.cc/uploads/git/wurui/img/2ahkwkkveTj1rgh0ueRlcquA5vz-1000.png" class="qrcode"/>

                    </div>
                    <div class="card-footer">
                        <span>{{setting.text2}}</span>
                    </div>
                </div>
            </div>
            {{/data}}
            </div>
            <div class="listbar">
                <span>
                    &nbsp;&nbsp;已选中 <span class="J_count">0</span>/{{data.length}}
                    <button class="bt-del J_del" disabled="disabled">删除己选</button>
                </span>
                <span>
                    <button class="bt-order J_order" disabled="disabled">结算</button>
                </span>
            </div>



        ]]>
        </script>
    </xsl:template>
</xsl:stylesheet>
