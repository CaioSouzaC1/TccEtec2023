const cpfValidate = (cpf) => {
  const theCpf = cpf.replace(/\.|-/g, "");

  const firstDi = (Cpf) => {
    let counter = 10;
    let total = 0;

    for (let i = 0; i < 9; i++) {
      total += Cpf[i] * counter;
      counter--;
    }

    total = (total * 10) % 11;
    return total == Cpf[9];
  };

  const secondDi = (Cpf) => {
    let counterSec = 11;
    let totalSec = 0;

    for (let i = 0; i < 10; i++) {
      totalSec += Cpf[i] * counterSec;
      counterSec--;
    }
    totalSec = (totalSec * 10) % 11;
    return totalSec == Cpf[10];
  };

  if (firstDi(theCpf) && secondDi(theCpf)) {
    return true;
  } else {
    return false;
  }
};
export default cpfValidate;
