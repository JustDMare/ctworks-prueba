# CTWorks Prueba (ctworks-prueba)

Prueba Técnica para CTWorks. En general he intentado documentar y razonar mis decisiones en el código. Aun así, queria explicar en el README el motivo de las decisiones relacionadas con la estructura de datos.

Por una parte creo que entiendo el razonamiento que se me dio en el correo sobre el uso de la siguiente estructura:

```js
key: {
  value: key,
  label: label
}
```

Ya que permite crear la tabla a partir de lo que es esencialmente un mapa, lo que debería hacer mas rápido el modificar/acceder los datos, pero no estoy muy seguro de cómo se pueden hacer los valores editables con esta estructura, ya que hasta donde yo sé, no se puede modificar el nombre de una propiedad de un objeto en JS, lo que o bien dejaria al objecto con una key que no se corresponde con el valor actual (si se modifica) o bien habría que eliminarlo y reinsertarlo con los nuevos datos, pero eso no creo que garantizaría que la tabla se mantuviera ordenada.
Por eso he decidido usar un simple array, ya que también se presta a crear la tabla de forma sencilla con los `v-for` y es más sencillo de modificar los valores internos cuando se edita la tabla (y si se quisiera reordenar las filas en un futuro, también se podría).

Con respecto a los prefijos de las filas con multiples "data values", aunque podría haberlo convertido en parte del texto editable ya que no me habíais puesto restricciones al respecto, decidí hacerlo una parte no editable de la tabla. Como tampoco había especificaciones al respecto de si se debería prestar a ser modificado o no de alguna manera, por ejemplo, con un dropdown seleccionando otro tipo de prefijos (por ejemplo, si fuese una tabla de coordenadas, usar prefijos como "X" y "Y"), decidí hacerlo de manera que la "configuración" de los prefijos afectase de forma global a toda la tabla (un set de prefijos se aplican a todas las celdas), ya que me parecía tan válido como permitir hacerlo de forma individual a cada celda, pero más sencillo de implementar.

## Ejecución

### Instalar las dependencias

```bash
yarn
# or
npm install
```

### Iniciar el servidor de desarrollo

```bash
quasar dev
```
