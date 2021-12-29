<?xml version="1.0"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
    <html>
        <head>
            <title>SkyBlue Smart Home</title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <link rel="stylesheet" href="css/SkyBlue.css"/>
        </head>
        <body>
            <h1>Welcome!</h1>
            <table id="menuTable" border="1" class="indent">
                <thead>
                    <tr>
                        <th colspan="3"><h2>SkyBlue Smart Home</h2></th>
                    </tr>
                    <tr>
                        <th>Select</th>
                        <th>Item</th>
                        <th>Price</th>
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
                                <td align="center">
                                    <input name="item0" type="checkbox" />
                                </td>
                                <td>
                                    <xsl:value-of select="item" />
                                </td>
                                <td align="right">
                                    <xsl:value-of select="price" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </xsl:for-each>
                </tbody>
            </table>
		</body>
	</html>
</xsl:template>
</xsl:stylesheet>