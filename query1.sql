CREATE TABLE datos(
  pais varchar(100) NOT NULL,
  fecha date NOT NULL,
  confirmados int unsigned NOT NULL,
  recuperados int unsigned NOT NULL,
  muertes int unsigned NOT NULL,
  cursandoEnf int unsigned NOT NULL,
  PRIMARY KEY(pais, fecha)
);
