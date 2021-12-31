<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
    <table id="menuTable" border="1" class="table">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="//section">
                        <tr>
                            <td colspan="3">
                                <h3><xsl:value-of select="@name" />
                            </td>
                        </tr>
                        <xsl:for-each select="entry">
                            <tr id="{position()}">
                                <td>
                                    <xsl:value-of select="item" />
                                </td>
                                <td>
                                    <xsl:value-of select="price" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </xsl:for-each>
                </tbody>
    </table>
</xsl:template>
</xsl:stylesheet>