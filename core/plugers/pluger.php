<?php

    class Pluger extends controlleur
    {

        private $mdl;

        private function __construct()
        {
            // 
        }

        protected function loadCategory($categoryname, $checkJoin=false, $filter=[])
        {
            return $this->loadModele('contents')->trouverTousContents($categoryname, $checkJoin, $filter);
        }

        protected function editContent($categoryname, $contentid, $content)
        {
            return $this->loadModele('contents')->modifierContent($content, $categoryname, $contentid);
        }

        protected function redirToApp($route)
        {
            $this->redirTo(Routes::find('base-route') . '/' . $route);
        }

        protected function redirToSelf($route)
        {
            $this->redirTo(Routes::find('plugins') . '/' . $GLOBALS['plugid'] . '/' . $route);
        }

    }