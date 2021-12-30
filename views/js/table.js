//Function to display table to end-user
function draw_table(){

    $("#results").empty(); //make sure the div is empty

    $.getHTMLuncached = function(url){
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html){
                $("#results").append(html); //append table to html doc
                select_row();
            }
        })
    };
    $.getHTMLuncached("/get/html");
};

function select_row()
{
	$("#menuTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
		var entree = $(this).attr("id") - 1;
		delete_row(section, entree);
	})
};

function delete_row(sec, ent)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				section: sec,
				entree: ent
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

//Load function as soon as the document is ready
$(document).ready(function(){
    draw_table();
});