<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:oxm="https://www.openxsl.com">
    <xsl:template match="/root" name="wurui.smct-works">
        <xsl:param name="actionShopcart"></xsl:param>
        <xsl:param name="actionBuild"></xsl:param>
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-smct-works" ox-mod="smct-works" data-uid="{login/uid}" data-shopcart="{$actionShopcart}" data-build="{$actionBuild}">
            <xsl:variable name="customizelist" select="data/customize/i"/>
            <xsl:variable name="customizelistcount" select="count($customizelist)"/>
            <xsl:variable name="extcls">
                <xsl:choose>
                    <xsl:when test="$customizelistcount mod 2 = 1">fix-flex</xsl:when>
                </xsl:choose>
            </xsl:variable>

            <div class="list J_list {$extcls}">
                <xsl:if test="$customizelistcount =0">
                    <div class="empty">
                        <i class="iconfont" style="font-size:50px;color:#ccc;">&#xe631;</i>&#160;&#160;<br/>作品栏是空的,赶紧去定制一个你喜欢的车贴吧~<br/><a href="{$actionBuild}">开始定制 &#187; </a><br/><br/></div>
                </xsl:if>

                <xsl:if test="$customizelistcount &gt; 4">

                    <div class="listbar">
                        <span>
                            &#160;&#160;已选中 <span class="J_count">0</span>/<xsl:value-of select="$customizelistcount"/>
                            <button class="bt-del J_del" disabled="disabled">删除已选</button>
                        </span>
                        <span>
                            <button class="bt-order J_order" disabled="disabled">结算</button>
                        </span>
                    </div>
                </xsl:if>

                <xsl:for-each select="$customizelist">
                    <div class="snapshot" data-id="{_id}" title="点击可选中">
                        <div class="snapshot-op">
                            <p>
                                <xsl:value-of select="time/y"/>/<xsl:value-of select="time/M"/>/<xsl:value-of select="time/d"/>
                                &#160;
                                <xsl:value-of select="time/H"/>:<xsl:value-of select="format-number(time/m,'00')"/>
                            </p>
                            <span class="status status-{status}"></span>
                            <p class="radio">
                                <input type="checkbox" name="preview" value="{_id}"/>
                            </p>
                        </div>
                        <div class="preview bgcolor-{props/i[key='bgcolor']/value}">
                            <div class="card-header">
                                <xsl:value-of select="props/i[key='text1']/value"/>
                            </div>
                            <div class="card-body tpl tpl-{props/i[key='tpl']/value}">
                                <div class="central">
                                    <img src="http://v.oxm1.cc/cars/{props/i[key='carlogo']/value}.png"/>
                                </div>
                                <img src="http://i.oxm1.cc/uploads/git/wurui/img/2ahkwkkveTj1rgh0ueRlcquA5vz-1000.png" class="qrcode"/>

                            </div>
                            <div class="card-footer">
                                <span>
                                    <xsl:value-of select="props/i[key='text2']/value"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </xsl:for-each>

            </div>

            <div class="listbar">
                <span>
                    &#160;&#160;已选中 <span class="J_count">0</span>/<xsl:value-of select="$customizelistcount"/>
                    <button class="bt-del J_del" disabled="disabled">删除己选</button>
                </span>
                <span>
                    <button class="bt-order J_order" disabled="disabled">结算</button>
                </span>
            </div>


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
