import { Component, OnInit } from '@angular/core';
import { celdaBuscaminas } from '../modelos';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  
  dimensionTamañoTablero: number = 10;
  tableroBuscaminas = new Array(10);
  bombaFila: number;
  bombaColumna: number;


  constructor() { }

  ngOnInit() {
    this.inicializarTablero();
    this.ponerBombas();
    this.obtenerValorCasillasSinBombas();

  }

  inicializarTablero() {
    for (let columna = 0; columna < this.dimensionTamañoTablero; columna++) {
      this.tableroBuscaminas[columna] = new Array(this.dimensionTamañoTablero);

      for (let fila = 0; fila < this.dimensionTamañoTablero; fila++) {
        this.tableroBuscaminas[columna][fila] = 0;
      }
    }
  }

  ponerBombas() {

    for (let bombas = 0; bombas < 10; bombas++) {
      this.bombaFila = Math.ceil(Math.random() * this.dimensionTamañoTablero) - 1;
      this.bombaColumna = Math.ceil(Math.random() * this.dimensionTamañoTablero) - 1;
      //console.log(this.bombaFila, this.bombaColumna, 'bomba');
      if (this.tableroBuscaminas[this.bombaFila][this.bombaColumna] == 9) {
        bombas--;
      }
      this.tableroBuscaminas[this.bombaFila][this.bombaColumna] = 9;
    }
    console.log(this.tableroBuscaminas)
  }

  obtenerValorCasillasSinBombas() {
    for (let fila = 0; fila < this.dimensionTamañoTablero; fila++) {
      for (let columna = 0; columna < this.dimensionTamañoTablero; columna++) {
        if (this.tableroBuscaminas[fila][columna] == 9) {

          const posicionDeFilaValidaArriba = ((fila - 1) >= 0);
          const posicionDeColumnaValidaIzquierda = ((columna - 1) >= 0);
          const posicionDeFilaValidaAbajo = (fila + 1) < this.dimensionTamañoTablero;
          const posicionDeColumnaValidaDerecha = ((columna + 1) < this.dimensionTamañoTablero);

          if (posicionDeFilaValidaArriba) {

            if ((this.tableroBuscaminas[fila - 1][columna] != 9)) {
              this.tableroBuscaminas[fila - 1][columna] = this.tableroBuscaminas[fila - 1][columna] + 1;
            }


            if (posicionDeColumnaValidaIzquierda && (this.tableroBuscaminas[fila - 1][columna - 1] != 9)) {
              this.tableroBuscaminas[fila - 1][columna - 1] = this.tableroBuscaminas[fila - 1][columna - 1] + 1;
            }

            if (posicionDeColumnaValidaDerecha && (this.tableroBuscaminas[fila - 1][columna + 1] != 9)) {
              this.tableroBuscaminas[fila - 1][columna + 1] = this.tableroBuscaminas[fila - 1][columna + 1] + 1;
            }

          }

          if (posicionDeColumnaValidaDerecha && (this.tableroBuscaminas[fila][columna + 1] != 9)) {
            this.tableroBuscaminas[fila][columna + 1] = this.tableroBuscaminas[fila][columna + 1] + 1;

          }

          if (posicionDeFilaValidaAbajo) {
            if ((this.tableroBuscaminas[fila + 1][columna] != 9)) {
              this.tableroBuscaminas[fila + 1][columna] = this.tableroBuscaminas[fila + 1][columna] + 1;
            }


            if (posicionDeColumnaValidaIzquierda && (this.tableroBuscaminas[fila + 1][columna - 1] != 9)) {
              this.tableroBuscaminas[fila + 1][columna - 1] = this.tableroBuscaminas[fila + 1][columna - 1] + 1;
            }

            if (posicionDeColumnaValidaDerecha && (this.tableroBuscaminas[fila + 1][columna + 1] != 9)) {
              this.tableroBuscaminas[fila + 1][columna + 1] = this.tableroBuscaminas[fila + 1][columna + 1] + 1;
            }

          }

          if (posicionDeColumnaValidaIzquierda && (this.tableroBuscaminas[fila][columna - 1] != 9)) {
            this.tableroBuscaminas[fila][columna - 1] = this.tableroBuscaminas[fila][columna - 1] + 1;

          }

        }

      }

    }

  }

}
