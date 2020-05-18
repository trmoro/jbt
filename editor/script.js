//No conflict mode
jQuery.noConflict();

//Set JBT URL
var JBT_ID = -1;
function SetJBTID(id)
{
	JBT_ID = id;
}

//Set JBT URL
var JBT_URL = "";
function SetJBTUrl(url)
{
	JBT_URL = url + "/editor/";
}

//Generate Input
function GenerateInput(input_id,label,type,placeholder,value)
{
	var str = "";
	
	//Open
	str += '<div class="form-group">';
	
	//Label
	str += '<label for="' + input_id + '">' + label + '</label>';
	
	//Input
	str += '<input type="' + type + '" class="form-control" id="' + input_id + '" placeholder="' + placeholder + '" value="' + value + '" />';
	
	//Close
	str += '</div>';
	
	return str;
}

//JBT Object
class JBTObj
{
    //Constructor
    constructor(id)
    {
		this.id = id;
		this.type = "notype";
    }
	
	//HTML View
	view()
	{
		//View
		var view_str = "";
	
		//Open
		if(inEdit)
			view_str += "<div id='" + this.id + "' class='jbt_in_edit'>";
		else
			view_str += "<div>";
	
		//Close
		view_str += "</div>";
	
		//Return
		return view_str;
	}
	
	//Editor View
	editor_view()
	{
		var str = "";
		
		str += GenerateInput('jbt_editorview_id','ID','text','enter_an_id',this.id);
		
		return str;
	}
	
	//Apply Editing
	apply_edit()
	{
		this.id = jQuery('#jbt_editorview_id').val();
	}
	
	//Get Children Objects
	get_children()
	{
		return [];
	}
	
	//Delete Child
	delete_child(obj)
	{
	}
	
	//Set Array
	set(values)
	{
	}
}

//Modal Diaporama Object
class ModalDiaporamaObj extends JBTObj
{
	//Constructor
	constructor(id,size)
	{
		super(id)
		this.type = "modal_diapo_obj";
		this.size = size;

		this.title = "Title";
		this.titleImage = JBT_URL + "test_image_1.png";
	
		this.diapoDesc = "Description";
		this.imageList = [JBT_URL + "test_image_1.png",JBT_URL + "test_image_2.png",JBT_URL + "test_image_3.png"];
	}
	
	//HTML View
	view(inEdit)
	{
		//View
		var view_str = "";
	
		//Open
		if(inEdit)
			view_str += "<div id='" + this.id + "' class='jbt_in_edit col-sm-" + this.size + "'>";
		else
			view_str += "<div id='" + this.id + "' class='col-sm-" + this.size + "'>";
	
		//Open Card
		view_str += '<div class="card" style="background-color: rgb(162,51,23); border-width: 5px;">';
	
		//Image
		view_str += '<img src="' + this.titleImage + '" class="card-img-top img-thumbnail" style="border-color: rgb(234,132,106);" alt="' + this.title +'" data-toggle="modal" data-target="#modal_' + this.id + '" />';
	
		//Title
		view_str += '<p class="card-text" style="text-align:center;color:white;">' + this.title + '</p>';
	
		//Close Card
		view_str += '</div>';
	
		//Close
		view_str += "</div>";
		
		//Modal Open
		view_str += '<div class="modal fade" id="modal_' + this.id + '" ><div class="modal-dialog modal-lg " >';
		
		//Modal Content Open
		view_str += '<div class="modal-content" style="background-image:linear-gradient(rgba(162,51,23,1), rgba(162,51,23,0.8) ); color : white;"><div class="modal-body">';
		
		//Carrousel Open
		view_str += '<div id="carousel_' + this.id + '" class="carousel slide" data-ride="carousel">';
		
		//Bottom Indicator Open
		view_str += '<ul class="carousel-indicators">';
		
		//Bottom Indicator
		for(var i = 0; i < this.imageList.length; i++)
		{
			if(i == 0)
				view_str += '<li data-target="#carousel_' + this.id + '" data-slide-to="' + i +'" class="active"></li>';
			else
				view_str += '<li data-target="#carousel_' + this.id + '" data-slide-to="' + i +'"></li>';
		}
		
		//Bottom Indicator Close
		view_str += '</ul>';
		
		//Images Open
		view_str += '<div class="carousel-inner">';
		
		//Images
		for(var i = 0; i < this.imageList.length; i++)
		{
			if(i == 0)
				view_str += '<div class="carousel-item active"><img src="' + this.imageList[i] + '" alt="' + this.imageList[i] + '" class="img-thumbnail"></div>';
			else
				view_str += '<div class="carousel-item"><img src="' + this.imageList[i] + '" alt="' + this.imageList[i] + '" class="img-thumbnail"></div>';
		}
		
		//Images Close
		view_str += '</div>';
		
		//Arrows
		view_str += '<a class="carousel-control-prev" href="#carousel_' + this.id + '" data-slide="prev"><span class="carousel-control-prev-icon"></span></a>';
		view_str += '<a class="carousel-control-next" href="#carousel_' + this.id + '" data-slide="next"><span class="carousel-control-next-icon"></span></a>';
		
		//Title
		view_str += '<br/><br/><h3>' + this.title + '</h3>';

		//Description
		view_str += '<p>' + this.diapoDesc + '</p>';
		
		//Carrousel Close
		view_str += '</div>';
		
		//Modal Content Close
		view_str += '</div></div>';
		
		//Modal Close
		view_str += '</div></div>';
	
		//Return
		return view_str;
	}
	
	//Editor View
	editor_view()
	{
		var str = "";
		
		str += GenerateInput('jbt_editorview_id','ID','text','enter_an_id',this.id);

		str += GenerateInput('jbt_mdobj_size','Column Size','number','between 1 and 12',this.size);
		str += GenerateInput('jbt_mdobj_title','Title','text','sample title',this.title);
		str += GenerateInput('jbt_mdobj_titleImg','Title Image','text','image_url',this.titleImage);
		str += GenerateInput('jbt_mdobj_desc','Description','text','sample description',this.diapoDesc);

		//Image List Text Area
		str += '<label>Images</label><br/><textarea id="jbt_mdobj_imglist" rows="4" cols="50">';
		
		//All Images
		for(var i = 0; i < this.imageList.length; i++)
			str += this.imageList[i] + '\n';
		
		//Close Text Area
		str += '</textarea>';
		
		return str;
	}
	
	//Apply Editing
	apply_edit()
	{
		this.id = jQuery('#jbt_editorview_id').val();
		
		this.size = parseInt(jQuery('#jbt_mdobj_size').val() );
		this.title = jQuery('#jbt_mdobj_title').val();
		this.titleImage = jQuery('#jbt_mdobj_titleImg').val();
		this.diapoDesc = jQuery('#jbt_mdobj_desc').val();
		
		var imgList = jQuery('#jbt_mdobj_imglist').val().split('\n');
		this.imageList = [];
		for(var i = 0; i < imgList.length; i++)
		{
			if(imgList[i] != "")
				this.imageList.push(imgList[i]);
		}
	}
	
	//Get Children
	get_children()
	{
		return [];
	}
	
	//Delete Child
	delete_child(obj)
	{
	}
	
	//Set Array
	set(values)
	{
		this.title = values.title;
		this.titleImage = values.titleImage;
		this.diapoDesc = values.diapoDesc;
		this.imageList = values.imageList;
	}
}

//Modal Diaporama
class ModalDiaporama extends JBTObj
{
	//Constructor
	constructor(id)
	{
		super(id);
		this.type = "modal_diapo";
		this.rows = [];
	}
	
	//HTML View
	view(inEdit)
	{
		//View
		var view_str = "";
	
		//Open
		if(inEdit)
			view_str += "<div id='" + this.id + "' class='jbt_in_edit'>";
		else
			view_str += "<div>";
		
		//Foreach row
		for(var i = 0; i < this.rows.length; i++)
		{
			//Open Row
			view_str += "<div class='row justify-content-md-center'>";
			
			//Foreach col
			for(var j = 0; j < this.rows[i].length; j++)
				view_str += this.rows[i][j].view(inEdit);
			
			//Close Row
			view_str += "</div><br/>";
		}
	
		//Close
		view_str += "</div>";
	
		//Return
		return view_str;
	}
	
	//Editor View
	editor_view()
	{
		var str = "";
		
		str += GenerateInput('jbt_editorview_id','ID','text','enter_an_id',this.id);
		
		str += GenerateInput('jbt_md_col','Column Number','number','between 1 and 12','');
		str += GenerateInput('jbt_md_csz','Column Size','number','between 1 and 12','');
		str += GenerateInput('jbt_md_row','Row Number','number','as you want','');
		
		return str;
	}
	
	//Apply Editing
	apply_edit()
	{
		this.id = jQuery('#jbt_editorview_id').val();
		
		var nCol = parseInt(jQuery('#jbt_md_col').val());
		var nRow = parseInt(jQuery('#jbt_md_row').val());
		var size = parseInt(jQuery('#jbt_md_csz').val());
		
		//Foreach row
		for(var i = 0; i < nRow; i++)
		{
			//Add if not already existing
			if(i >= this.rows.length)
			{
				//New Row
				this.rows.push([]);
				
				//Foreach col
				for(var j = 0; j < nCol; j++)
				{
					//Add if not already existing
					if(j >= this.rows[i].length)
						this.rows[i].push(new ModalDiaporamaObj(this.id + "_" + i + "_" + j,size) );
				}
			}
		}
	}
	
	//Get Children
	get_children()
	{
		var children = [];
		for(var i = 0; i < this.rows.length; i++)
		{
			for(var j = 0; j < this.rows[i].length; j++)
				children.push(this.rows[i][j]);
		}
		return children;
	}
	
	//Delete Child
	delete_child(obj)
	{		
		//Find indices
		var rowIndex = -1;
		var colIndex = -1;
		for(var i = 0; i < this.rows.length; i++)
		{
			for(var j = 0; j < this.rows[i].length; j++)
			{
				if(this.rows[i][j] == obj)
				{
					rowIndex = i;
					colIndex = j;
				}
			}
		}
		
		//Delete
		this.rows[rowIndex].splice(colIndex, 1);
	}
	
	//Set Array
	set(values)
	{
		for(var i = 0; i < values.rows.length; i++)
		{
			//Push a new row
			this.rows.push([]);
			
			//Push object
			for(var j = 0; j < values.rows[i].length; j++)
			{
				this.rows[i].push(new ModalDiaporamaObj(values.rows[i][j].id,values.rows[i][j].size) );
				this.rows[i][j].set(values.rows[i][j]);
			}
			
			//
		}
	}
}

//JBT Class
class JBT
{
    //Constructor
    constructor()
    {
		//Object Array
		this.obj = [];
		
		//In JBT Editor
		this.inEditor = false;
		
		//Object in Editing
		this.objInEdit = null;
    }
	
	//Add
	add(type)
	{
		//Modal Diaporama
		if(type == "modal_diapo")
			this.obj.push(new ModalDiaporama(jQuery('#jbt_add_modal_id').val() ) );
		
		//Close and Update
		jQuery('#jbt_add_modal').modal('hide');		
		this.updateHTML();
	}
	
	//Edit
	edit(id)
	{
		//Un-select
		this.objInEdit = null;
		
		//Set Object in editing
		for(var i = 0; i < this.obj.length; i++)
		{
			//Test Object
			if(this.objInEdit == null && this.obj[i].id == id)
				this.objInEdit = this.obj[i];
			
			//Test Children of this object
			else if(this.objInEdit == null)
			{
				var children = this.obj[i].get_children();
				for(var j = 0; j < children.length; j++)
				{
					if(children[j].id == id)
						this.objInEdit = children[j];
				}
			}
		}
		
		//Show Edit Modal
		jQuery('#jbt_edit_modal_body').html("");
		jQuery('#jbt_edit_modal_body').html(this.objInEdit.editor_view() );
		jQuery('#jbt_edit_modal').modal('show');
	}
	
	//Save Edit
	saveEdit()
	{
		//Close and Update
		this.objInEdit.apply_edit();
		this.objInEdit = null;
		jQuery('#jbt_edit_modal').modal('hide');
		this.updateHTML();
	}
	
	//Delete
	deleteObj(id)
	{
		var index = -1;
		var child_detected = null;
		for(var i = 0; i < this.obj.length; i++)
		{
			//Object
			if(index == -1 && this.obj[i].id == id)
				index = i;
			
			//Children Object
			if(child_detected == null)
			{
				var children = this.obj[i].get_children();
				for(var j = 0; j < children.length; j++)
				{
					if(children[j].id == id)
					{
						index = i;
						child_detected = children[j];
					}
				}
			}
			
			//
		}
		
		//Delete Object and its childrens
		if(index != -1 && child_detected == null)
			this.obj.splice(index, 1);
		
		//Delete Child Object
		else if(child_detected != null)
			this.obj[index].delete_child(child_detected);
	}

    //Update HTML
    updateHTML()
    {
		//Foreach object, print view
		var allView = "";
		for(var i = 0; i < this.obj.length; i++)
			allView += this.obj[i].view(this.inEditor);
		jQuery('#jbt_root').html(allView);
    }
	
	//Set Edit On
	setEditOn()
	{
		this.inEditor = true;
	}
	
	//Load
	load(json_string)
	{
		if(json_string != "")
		{
			//Empty objects list
			this.obj = [];
			
			//Get objects values
			var obj_array = JSON.parse(json_string);
			
			
			//Convert values array to object instances
			for(var i = 0; i < obj_array.length; i++)
			{
				//Modal
				var newObj = null;
				if(obj_array[i].type == "modal_diapo")
					newObj = new ModalDiaporama(obj_array[i].id);

				//Set and Push object
				if(newObj != null)
				{
					newObj.set(obj_array[i]);
					this.obj.push(newObj);
				}
			}
						
			//Update HTML
			this.updateHTML();
		}
	}
	
	//Get Json
	getJson()
	{
		return JSON.stringify(this.obj);
	}
	
	//Save
	save()
	{
		function saveCallback(returned_text)
		{					
			console.log(returned_text);
		
			//Alert
			if(returned_text == "saved")
				jQuery('#jbt_alert_div').append('<div class="alert alert-success alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button>Successfully saved !</div>');
		}
		
		jQuery.post(JBT_URL + 'save.php',{"id" : JBT_ID, "json" : this.getJson()},saveCallback,'text');
	}
	
	//
}

//Singletone JBT
let jbt = new JBT();

//When the document is read, update html
jQuery(document).ready(function(){jbt.updateHTML();});

//JBT Context Menu
jQuery(function(){
    jQuery.contextMenu({
        selector: '.jbt_in_edit', 
        callback: function(key, options) {
						
            //Edit
            if(key == "edit")
                jbt.edit(jQuery(this).attr('id'));
			
            //Delete
            else if(key == "delete")
                jbt.deleteObj(jQuery(this).attr('id'));
			
            //Update HTML
            jbt.updateHTML();
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
            "delete": {name: "Delete", icon: function(jQueryelement, key, item){ return 'context-menu-icon context-menu-icon-quit'; }},
            "sep1": "---------",
            "quit": {name: "Close", icon: function(jQueryelement, key, item){ return 'context-menu-icon context-menu-icon-quit'; }}
        }
    });
});