<?php

	//Classe permettant de stocker les onglets sous forme d'arbre
	class ArbreOnglet
	{
		//Onglet (C'est l'étiquette du noeud de l'arbre)
		private $ongl;

		//Fils
		private $fils;
		
		//Constructeur
		public function __construct($menuItem)
		{
			$this->ongl = $menuItem;
			$this->fils = array();
		}
		
		//Obtient l'onglet
		public function getOnglet()
		{
			return $this->ongl;
		}
		
		//Obtient les onglets fils
		public function getFils()
		{
			return $this->fils;
		}
		
		//Pas de Fils
		public function pasDeFils()
		{
			return sizeof($this->fils) == 0;
		}
		
		//Ajoute un fils
		public function ajouteFils($onglet)
		{
			array_push($this->fils,$onglet);
		}
		
		//
	}
	
	///	Etape 1 : lis la liste des MenuItem de Joomla pour les mettre sous la forme d'un arbre
	/// Note : pour l'instant, l'arbre n'a que 3 couche : racine, fils, petit-fils

	//On récupère toutes les données du menu principale
	$menu_items = JFactory::getApplication()->getMenu()->getItems('menutype', 'mainmenu');

	//Création de l'arbre avec l'étiquette racine
	$arbre = new ArbreOnglet('racine');

	//Lecture
	foreach($menu_items as $onglet)
	{
		//Si le parent est "1", racine du menu, on ajoute simplement l'onglet à l'arbre en créant un arbre fils
		if($onglet->parent_id == "1")
			$arbre->ajouteFils(new ArbreOnglet($onglet) );
		//Sinon, on cherche dans l'arbre le parent de l'onglet
		else
		{
			//On cherche dans l'arbre le parent
			foreach($arbre->getFils() as $arbFils)
			{
				//C'est le parent de l'onglet
				if($arbFils->getOnglet()->id == $onglet->parent_id )
					$arbFils->ajouteFils(new ArbreOnglet($onglet) );
			}
		}
	}
	
	
	/// Etape 2 : Lecture de l'arbre et affichage
	
	//Ouverture du menu en tant que liste
	echo '<ul class="navbar-nav">';

	//On lit les fils de l'arbre
	foreach($arbre->getFils() as $fils)
	{
		//S'il n'a pas de fils, on affiche l'onglet directement
		if($fils->pasDeFils() == true)
			echo '<li class="nav-item"><a class="nav-link" href="' .$fils->getOnglet()->link .'">' .$fils->getOnglet()->title .'</a></li>';
		//Sinon on crée un menu déroulant
		else
		{
			//Titre du menu déroulant
			echo '<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">' .$fils->getOnglet()->title .'</a>';
			
			//Ouverture
			echo '<div class="dropdown-menu">';
			
			//Pour tous les petits-fils, on crée un lien
			foreach($fils->getFils() as $pf)
				echo '<a class="dropdown-item" href="' .$pf->getOnglet()->link .'">' .$pf->getOnglet()->title .'</a>';
			
			//Fermeture
			echo '</div>';
		}
	}

	//Fermeture du menu
	echo '</ul>';
?>