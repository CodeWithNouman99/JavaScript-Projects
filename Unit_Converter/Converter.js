const inputValue = document.querySelector('.input');
    const fromButton = document.querySelector('#fromUnit');
    const toButton = document.querySelector('#toUnit');
    const convertButton = document.querySelector('#convertButton');
    const resultSpan = document.querySelector('#result');

    const conversionRates = {
      meters: 1,
      Kilometers: 1000,
      miles: 1609,
      feet: 0.3048
    };

    convertButton.addEventListener('click', () => {
      const value = parseFloat(inputValue.value);

      if (isNaN(value) || value <= 0) {
        alert("Please enter a valid number!");
        return;
      }

      const inMeters = value * conversionRates[fromButton.value];
      const result = inMeters / conversionRates[toButton.value];
      resultSpan.textContent = result.toFixed(2);
    });

    // Clear result when input changes
    inputValue.addEventListener('input', () => {
      resultSpan.textContent = "0";
    });
