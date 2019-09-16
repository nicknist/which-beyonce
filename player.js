class Player {
  constructor(name, matchCount) {
    this.name = name;
    this.matchCount = matchCount || 0;
  }

  findMatch() {
    this.matchCount += 1;
  }
}
