export class Game {
  grid: any[] = []

  newGame() {
    // Réinitialisation de la grille de jeu
    this.grid = new Array(10).fill(null).map(() => new Array(10).fill(null))

    // Initialisation de la grille avec des cases vides
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = {
          aroundMinesCount: 0,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          isExploded: false
        }
      }
    }

    // Placement des mines aléatoire
    this.randomMines(20);

    // Calcul du nombre de mines adjacentes pour chaque case
    this.calculateMinesCount();

    console.log(this.grid)
  }
  
  getGrid() {
    return this.grid
  }

  getRows() {
    return this.grid.length
  }

  getCols() {
    return this.grid[0].length
  }

  private randomMines(minesCount: number) {
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
      const x = Math.floor(Math.random() * this.grid.length);
      const y = Math.floor(Math.random() * this.grid[0].length);

      if (!this.grid[x][y].isMine) {
        this.grid[x][y].isMine = true;
        minesPlaced++;
      }
    }
  }

  private calculateMinesCount() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (!this.grid[i][j].isMine) {
          let minesCount = 0;

          // Vérification des 8 cases adjacentes
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              // On évite de vérifier la case courante
              if (di === 0 && dj === 0) continue;

              const ni = i + di;
              const nj = j + dj;

              // Vérification que la case adjacente est dans la grille
              if (ni >= 0 && ni < this.grid.length &&
                nj >= 0 && nj < this.grid[i].length) {
                if (this.grid[ni][nj].isMine) {
                  minesCount++;
                }
              }
            }
          }

          this.grid[i][j].aroundMinesCount = minesCount;
        }
      }
    }
  }

  public revealCell(row: number, col: number) {
    if (this.grid[row][col].isRevealed) return;
    
    this.grid[row][col].isRevealed = true;

    if (this.grid[row][col].aroundMinesCount == 0 && this.grid[row][col].isMine == false) {
      this.revealAllCellsWithAroundMinesCount0();
    }
    
    if (this.grid[row][col].isMine) {
      this.grid[row][col].isExploded = true;
      this.revealAllCells();
    }
  }

  public revealAllCellsWithAroundMinesCount0() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].aroundMinesCount === 0 && this.grid[i][j].isMine == false) {
          this.revealCell(i, j);
        }
      }
    }
  }

  public revealAllCells() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.revealCell(i, j);
      }
    }
  }
} 