<?php

	//Save Script
	require_once "../../../configuration.php";
	$jc = new JConfig();
		
	//MySQLi
	if($jc->dbtype == "mysqli")
	{
		//Connection
		$conn = new mysqli($jc->host, $jc->user, $jc->password, $jc->db);
		
		//Test Connection
		if ($conn->connect_error)
			echo "connection error";
		else
		{
			$dbtable = $jc->dbprefix ."jbt";
			$sql = "UPDATE " .$dbtable ." SET json='" .$_POST["json"]  ."' WHERE id=" .$_POST["id"] .";";
			
			//Test Query
			if ($conn->query($sql) === TRUE)
				echo "saved";
			else
				echo "query failed";
		}
	}
	
	//No DB
	else
		echo "no usable db";
	
	//echo json_encode(new JConfig() );
		
	/*
	echo "passe";
	
	$mainframe = JFactory::getApplication('site');
	$mainframe->initialise();	
	$db = JFactory::getDbo();

	
	$json = $_POST["json"];
	
	$query = $db->getQuery(true)
				->update($db->quoteName('#__jbm') )
				->set($db->quoteName('json') . ' = ' .$db->quote($json) )
				->where($db->quoteName('id') . ' = ' .$db->quote($id) );
	$db->setQuery($query);
	$result = $db->execute();
	
	echo "pass";
	*/
?>