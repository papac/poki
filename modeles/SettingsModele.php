<?php

    class SettingsModele extends modele
    {
        public function create($keyname, $stringvalue) {

        }

        public function update($keyname, $stringvalue) {

        }

        public function get($keyname) {
            try {
                $q = modele::$bd->query("SELECT * FROM adm_settings WHERE keyname='$keyname'");
                $r = $q->fetchAll(PDO::FETCH_ASSOC);
                $q->closeCursor();
                return count($r) ? (object) $r[0] : false;
            }
            catch (Exception $e) {
                return false;
            }
        }
    }
    