CREATE TABLE datosUruguay(
  id int unsigned NOT NULL AUTO_INCREMENT,
  fecha date NOT NULL,
  confirmados int unsigned NOT NULL,
  recuperados int unsigned NOT NULL,
  muertes int unsigned NOT NULL,
  cursandoEnf int unsigned NOT NULL,
  PRIMARY KEY(id)
);
  
  
UPDATE datosUruguay 
  SET fecha='2020-08-07',
  confirmados=1325,
  recuperados=1095,
  muertes=37,
  cursandoEnf=193 
 WHERE id=1;
