import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  dimensionTamañoTablero: number = 10;
  tableroBuscaminas: any;
  bombaFila: number;
  bombaColumna: number;
  tableroSuperficial: any;


  constructor() { }

  ngOnInit() {
    this.tableroBuscaminas = new Array(this.dimensionTamañoTablero);
    this.tableroSuperficial = new Array(this.dimensionTamañoTablero);
    this.inicializarTablero();
    this.inicializarTableroSuperficial();
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

  inicializarTableroSuperficial() {

    for (let columna = 0; columna < this.dimensionTamañoTablero; columna++) {
      this.tableroSuperficial[columna] = new Array(this.dimensionTamañoTablero);
      for (let fila = 0; fila < this.dimensionTamañoTablero; fila++) {
        this.tableroSuperficial[columna][fila] = 0;
      }
    }
  }

  ponerBombas() {

    for (let bombas = 0; bombas < 10; bombas++) {
      this.bombaFila = Math.ceil(Math.random() * this.dimensionTamañoTablero) - 1;
      this.bombaColumna = Math.ceil(Math.random() * this.dimensionTamañoTablero) - 1;
      if (this.tableroBuscaminas[this.bombaFila][this.bombaColumna] == 9) {
        bombas--;
      }
      this.tableroBuscaminas[this.bombaFila][this.bombaColumna] = 9;
    }
    console.log(this.tableroBuscaminas);
  }

  clickCasilla(filaClickeada: number, columnaClickeada: number) {

    this.tableroSuperficial[filaClickeada][columnaClickeada] = 1;
    if (this.tableroBuscaminas[filaClickeada][columnaClickeada] == 9) {
      this.destaparTableroSuperficial();
    } else {
      this.destaparceldasVecinasSinBombas(filaClickeada, columnaClickeada);
    }
  }

  destaparTableroSuperficial() {

    for (let columna = 0; columna < this.dimensionTamañoTablero; columna++) {
      this.tableroSuperficial[columna] = new Array(this.dimensionTamañoTablero);
      for (let fila = 0; fila < this.dimensionTamañoTablero; fila++) {
        this.tableroSuperficial[columna][fila] = 1;
      }
    }
  }

  destaparceldasVecinasSinBombas(filaClickeada: number, columnaClickeada: number) {

    for (let i = filaClickeada; this.tableroBuscaminas[i][columnaClickeada] == 0; i++) {
      this.tableroSuperficial[i][columnaClickeada] = 1;
      console.log('fila1',i);

      for (let j = columnaClickeada; this.tableroBuscaminas[i][j] == 0; j--) {
        this.tableroSuperficial[i][j] = 1;
        console.log('columna iz',j);

      }
      for (let k = columnaClickeada; this.tableroBuscaminas[i][k] == 0; k++) {
        this.tableroSuperficial[i][k] = 1;
        console.log('columna der',k);

      }
    }1-6

    for (let i = filaClickeada; this.tableroBuscaminas[i][columnaClickeada] == 0; i--) {
      this.tableroSuperficial[i][columnaClickeada] = 1;
      console.log('fila2',i);

      for (let j = columnaClickeada; this.tableroBuscaminas[i][j] == 0; j--) {
        this.tableroSuperficial[i][j] = 1;
        console.log('columna iz',j);

      }

      for (let k = columnaClickeada; this.tableroBuscaminas[i][k] == 0; k++) {
        this.tableroSuperficial[i][k] = 1;
        console.log('columna der',k);

      }
    }

/*     for (let i = columnaClickeada; this.tableroBuscaminas[filaClickeada][i] == 0; i++) {

      this.tableroSuperficial[filaClickeada][i] = 1;
      for (let j = columnaClickeada; this.tableroBuscaminas[i][j] == 0; j--) {

        this.tableroSuperficial[i][j] = 1;

      }
      for (let k = columnaClickeada; this.tableroBuscaminas[i][k] == 0; k++) {

        this.tableroSuperficial[i][k] = 1;

      }
    } */

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

