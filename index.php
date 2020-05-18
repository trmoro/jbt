<!DOCTYPE html>

<?php
	//Variables
	$url = $this->baseurl ."/templates/" .$this->template;
	$params = JFactory::getApplication()->getTemplate(true)->params;
	$config = JFactory::getConfig();
	$id = JFactory::getApplication()->input->get('id');
	
	//Obtain a database connection
	$db = JFactory::getDbo();

	//Count to know if record already exists
	$query = $db->getQuery(true)
				->select('COUNT(*)')
				->from($db->quoteName('#__jbt'))
				->where($db->quoteName('id') . " = " . $id);
	$db->setQuery($query);
	$count = $db->loadResult();

	//If exist, get json
	if($count == 1)
	{	
		$query = $db->getQuery(true)
					->select($db->quoteName('json'))
					->from($db->quoteName('#__jbt'))
					->where('id = ' . $id);
		$db->setQuery($query);
		$db_result = $db->loadResult();
	}
	//Else, insert
	else
	{	
		$columns = array('id', 'json');
		$values = array($id, $db->quote('') );
		$query = $db->getQuery(true)
					->insert($db->quoteName('#__jbt'))
					->columns($db->quoteName($columns))
					->values(implode(',', $values));
		$db->setQuery($query);
		$db->execute();
}
?>

<html>

	<head>
	
		<!--Include Joomla Head -->
		<jdoc:include type="head" />

		<!-- Metas -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<!-- Load Dependencies -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" type="text/javascript"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script> 
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js" type="text/javascript"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js" type="text/javascript"></script>

		<!-- JBT Css -->
		<link rel="stylesheet" href="<?php echo $url;?>/css/jbt.css">
		<link rel="stylesheet" href="<?php echo $url;?>/editor/style.css">

	</head>
		
<body>

	<!-- Show error message -->
	<jdoc:include type="message" />

	<!-- Menu !-->
	<nav class="navbar navbar-expand-sm navbar-dark scrolling-navbar">
	
		<!--Site Title !-->
		<h3>
			<big><a class="navbar-brand" href="#" ><?php echo $config->get('sitename');?></a></big>
		</h3>
		
		<!-- Collapsible Menu on mobile !-->
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
			<span class="navbar-toggler-icon"></span>
		</button>
		
		<!-- Load Menu !-->
		<div class="collapse navbar-collapse" id="collapsibleNavbar">
			<?php require_once "php/menu.php"; ?>
		</div>  
	</nav>
	
	<!-- Page Content -->
	<br/><br/>
	<div class="container" id="" style="text-align: justify;">
	
		<!-- Joomla -->
		<div class="row" style="text-align: justify;">
			<jdoc:include type="component" />
		</div>
		
		<!-- JBT -->
		<div id="jbt_root" class="container-fluid">
		</div>

		<?php

			//If record exist
			if($count == 1)
				echo "<script>jbt.load('" .$db_result ."');</script>";

			//Is user admin ?
			$user = JFactory::getUser();
			$show = $user->get('isRoot');

			//Show editor	
			if($show)
			{
				echo "<script>SetJBTID(" .$id .");SetJBTUrl('" .$url ."');</script>";
				require_once "editor/editor.php";
			}
		?>
		
	</div>
	
		
</body>

</html>