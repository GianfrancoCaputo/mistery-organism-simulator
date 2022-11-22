/*
  Context:  
 
    You’re part of a research team that has found a new mysterious organism
    at the bottom of the ocean near hydrothermal vents. Your team names the organism, 
    Pila aequor (P. aequor), and finds that it is only comprised of 15 DNA bases. 
    The small DNA samples and frequency at which it mutates due to the hydrothermal
    vents make P. aequor an interesting specimen to study. However, P. aequor cannot
    survive above sea level and locating P. aequor in the deep sea is difficult and expensive. 
    Your job is to create objects that simulate the DNA of P. aequor for your research team to study.

  The program creates objects that simulate organisms with random DNA bases, 
  with the ability to mutate, create a complementary strand, compare its DNA 
  with another organism, evaluate its likeliness to survive based on its DNA 
  base, create samples with specified rules and evaluate which are the most 
  related instances of organisms in the sample.
*/



// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Returns a single pAequor object.
const pAequorFactory = (number, dnaBasesArr) => {
  return {
    _specimenNum: number,
    _dna: dnaBasesArr,
    mutate(){
      // To randomly select a base in the objects dna:
      let randomIndex = [Math.floor(Math.random() * this._dna)];
      let randomBase = this._dna[randomIndex];
      let newBase = returnRandBase();
      if (newBase !== randomBase){
        this._dna[randomIndex] = newBase;
      }
      if (newBase === randomBase){
        do {newBase = returnRandBase();
          this._dna[randomIndex] = newBase;}
          while (newBase === randomBase);
      }
      return this._dna;
    },
    // To compare it's DNA with anothers pAequor's DNA.
    compareDNA(pAequor){
      let similarDnaBaseNum = 0;
      for (i = 0; i < this._dna.length; i++){
        if (this._dna[i] === pAequor._dna[i]){similarDnaBaseNum ++}
      }
      let similarDnaBasePercentage = similarDnaBaseNum/this._dna.length;
      // Uncomment the line below when calling this method. 
      //console.log(`specimen ${this._specimenNum} and specimen ${pAequor._specimenNum} have ${(similarDnaBasePercentage *100).toFixed(2)}% DNA in common.`);
      return similarDnaBasePercentage;
    },
    // P.aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
    willLikelySurvive(){
      let numOfCOrGBases = 0;
      for (i = 0; i < this._dna.length; i++)
      if ( this._dna[i] === 'C' || this._dna[i] === 'G'){
        numOfCOrGBases++;
      }
      let surviverDnaPercentage = numOfCOrGBases/this._dna.length;
      if (surviverDnaPercentage >= 0.6){
        return true;
      } else {
        return false}
    },
    complementStrand(){
      const completaryStrand = [];
      for (i = 0; i < this._dna.length; i++){
        switch (this._dna[i]) {
          case 'A': completaryStrand.push('T');
          break;
          case 'T': completaryStrand.push('A');
          break;
          case 'C': completaryStrand.push('G');
          break;
          case 'G': completaryStrand.push('C');
          break;
          default: console.log('There\'s been an error.');
          break;
        }
      }
      return completaryStrand;
    }
  }
}

const sampleMaker = size =>{
  const pAequorSample = [];
  while (pAequorSample.length < size){
    let i = pAequorSample.length + 1;
    let specimen = pAequorFactory( i, mockUpStrand());
    if (specimen.willLikelySurvive() === true){
      pAequorSample.push(specimen);
    }
  }
  return pAequorSample;
}
// When using mostRelated function, comment out the console.log on line 57 to avoid getting every comparison logged on the console.
const mostRelated = sample => {
  const pairsToCheck = [];
  for (i = 0; i < sample.length - 1; i++){
    for (j = 1; j < sample.length; j++){
      if(i !== j && j > i){
      pairsToCheck.push([sample[i], sample[j]])}
    }
  }
  let mostRelatedPairs = [];
  let similarDnaBasePercentage = 0;
  pairsToCheck.forEach(pair => {
    let percentage = pair[0].compareDNA(pair[1]);
    if (percentage > similarDnaBasePercentage){
      similarDnaBasePercentage = percentage;
    }
  })
  pairsToCheck.forEach(pair => {
    let percentage = pair[0].compareDNA(pair[1]);
    if (percentage === similarDnaBasePercentage){
      mostRelatedPairs.push(pair); 
    }
  })
  if(mostRelatedPairs.length < 2){
    console.log(`Out of ${sample.length} samples and ${pairsToCheck.length} combinations, the most related instance of pAequors, with ${(similarDnaBasePercentage *100).toFixed(2)}% DNA base overlap, is: `);
    console.log(mostRelatedPairs);
  }
  if(mostRelatedPairs.length >= 2){
    console.log(`Out of ${sample.length} samples and ${pairsToCheck.length} combinations, the most related instances(${mostRelatedPairs.length}) of pAequors, with ${(similarDnaBasePercentage *100).toFixed(2)}% DNA base overlap, are: `);
    console.log(mostRelatedPairs);
  }
}

mostRelated(sampleMaker(30));

