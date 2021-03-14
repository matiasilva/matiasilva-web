class Simulation {
  constructor(population) {
    this.population = population;
    this.pInfection = 0.2;
    this.pMortality = 0.03;
    this.latestData = [];
    this.people = [];
    for (let i = 0; i < this.population; i++) {
      this.people.push(new Person(random(width), random(height)));
    }
    // choose a patient zero
    const patientZero = random(this.people);
    patientZero.setStatus('I');
  }

  show() {
    for (const person of this.people) {
      person.render();
    }
  }

  update() {
    for (const person of this.people) {
      person.updateMotion();
    }
  }

  step() {
    const s_people = this.people.filter(person => person.status == 'S');
    const i_people = this.people.filter(person => person.status == 'I');
    const r_people = this.people.filter(person => person.status == 'R');
    this.latestData = [s_people.length, i_people.length, r_people.length];
    for (const s_person of s_people) {
      for (const i_person of i_people) {
        const dist = p5.Vector.sub(s_person.position, i_person.position).mag();
        const isInRadius =
          dist <
          i_person.attributes.infectionRadius + s_person.attributes.radius;
        const canBeInfected = random() < this.pInfection;
        if (isInRadius && canBeInfected) {
          s_person.setStatus('I');
          i_person.numberInfected++;
        }
      }
    }
    // loops can be condensed
    for (const i_person of i_people) {
      i_person.tryRemove();
    }

    if (r_people.length == this.population) this.stop();
  }

  getLatestData() {
    return this.latestData;
  }

  stop() {
    for (const person of this.people) {
      person.attributes.lerpedColor = Person.resolveColor(person.status);
    }
    noLoop();
  }
}
