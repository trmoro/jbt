<!-- JBT Editor -->
<div id="jbt_editor" class="card">
	<div class="card-body">
	
		<h4 class="card-title">JBT Editor</h4>
		<p>Use right click on items</p>
	
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#jbt_add_modal">New Item</button>
		<button type="button" class="btn btn-success" onclick="jbt.save();">Save</button>
		
	</div>
</div>

<!-- Add JBTObject Modal -->
<div class="modal" id="jbt_add_modal">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<h4 class="modal-title">Select an Item to Add</h4>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<div class="modal-body">
				
				<div class="form-group">
				  <label for="jbt_add_modal_id">ID :</label>
				  <input type="text" class="form-control" id="jbt_add_modal_id" placeholder="enter_an_id"/>
				</div>
			
				<button type="button" class="btn btn-primary" onclick="jbt.add('modal_diapo');">Modal Diaporama</button>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
			</div>

		</div>
	</div>
</div>

<!-- Edit JBTObject Modal -->
<div class="modal" id="jbt_edit_modal">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<h4 class="modal-title">Edit</h4>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<div class="modal-body" id="jbt_edit_modal_body">
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="jbt.saveEdit();">Save</button>
				<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
			</div>

		</div>
	</div>
</div>

<!-- Alert Div-->
<div id="jbt_alert_div">
</div>

<!-- Call Script -->
<script>
	jbt.setEditOn();
</script>