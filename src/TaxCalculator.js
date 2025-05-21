import React, { useState } from "react";

const TaxCalculator = () => {
  const [salary, setSalary] = useState(12570);
  const [dividends, setDividends] = useState(0);
  const [cryptoGains, setCryptoGains] = useState(0);
  const [vct, setVct] = useState(0);
  const [eis, setEis] = useState(0);
  const [seis, setSeis] = useState(0);
  const [isHigherCryptoTax, setIsHigherCryptoTax] = useState(false);
  const [taxBill, setTaxBill] = useState(null);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(null);
  const [taxBreakdown, setTaxBreakdown] = useState({
    incomeTax: 0,
    capitalGainsTax: 0,
    totalReliefs: 0,
  });

  const calculateTax = () => {
    // Constants
    const personalAllowance = 12570;
    const dividendAllowance = 500;
    const dividendRates = [0.0875, 0.3375, 0.3935];
    const cryptoTaxRate = isHigherCryptoTax ? 0.24 : 0.18;
    const annualExemptAmount = 3000;
    const vctReliefRate = 0.3;
    const eisReliefRate = 0.3;
    const seisReliefRate = 0.5;

    // Income Tax Calculation
    let taxableSalary = Math.max(0, salary - personalAllowance);
    let incomeTax = taxableSalary * 0.2; // Example: Assume flat 20% rate on taxable income

    // Dividend Tax Calculation
    let taxableDividends = Math.max(0, dividends - dividendAllowance);
    let dividendTax = 0;
    if (taxableDividends > 0) {
      const basicRateLimit = Math.max(0, 37700 - taxableSalary);
      if (taxableDividends <= basicRateLimit) {
        dividendTax = taxableDividends * dividendRates[0];
      } else if (taxableDividends <= 125140) {
        dividendTax =
          basicRateLimit * dividendRates[0] +
          (taxableDividends - basicRateLimit) * dividendRates[1];
      } else {
        dividendTax =
          basicRateLimit * dividendRates[0] +
          (125140 - basicRateLimit) * dividendRates[1] +
          (taxableDividends - 125140) * dividendRates[2];
      }
    }
    incomeTax += dividendTax;

    // Capital Gains Tax Calculation
    let taxableCryptoGains = Math.max(0, cryptoGains - annualExemptAmount);
    let capitalGainsTax = taxableCryptoGains * cryptoTaxRate;

    // Reliefs
    let vctRelief = Math.min(vct * vctReliefRate, incomeTax);
    let eisRelief = Math.min(eis * eisReliefRate, capitalGainsTax);
    let seisRelief = Math.min(seis * seisReliefRate, capitalGainsTax);
    let totalReliefs = vctRelief + eisRelief + seisRelief;

    // Final Tax Calculation
    let totalTax = incomeTax + capitalGainsTax - totalReliefs;
    totalTax = Math.max(0, totalTax);

    // Effective Tax Rate
    let totalIncome = salary + dividends + cryptoGains;
    let effectiveTaxRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

    // Update States
    setTaxBill(totalTax.toFixed(2));
    setEffectiveTaxRate(effectiveTaxRate.toFixed(2));
    setTaxBreakdown({
      incomeTax: incomeTax.toFixed(2),
      capitalGainsTax: capitalGainsTax.toFixed(2),
      totalReliefs: totalReliefs.toFixed(2),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Tax Strategy Calculator
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          This calculator helps you understand your total tax liability and
          effective tax rate based on your salary, dividends, crypto gains, and
          investments. It calculates income tax and capital gains tax, applying
          appropriate reliefs (e.g., VCT for income tax and EIS/SEIS for capital
          gains tax).
        </p>

        {/* Income Details Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Income Details
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Director's Salary (£)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100000"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-24 p-2 border rounded-lg text-right"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Assumes a tax-free personal allowance of £12,570.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Dividends (£)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000000"
                value={dividends}
                onChange={(e) => setDividends(Number(e.target.value))}
                className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={dividends}
                onChange={(e) => setDividends(Number(e.target.value))}
                className="w-24 p-2 border rounded-lg text-right"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              £500 dividend allowance applies. Tax rates vary by income band.
            </p>
          </div>
        </div>

        {/* Investment Gains Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Investment Gains
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Crypto Gains (£)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000000"
                value={cryptoGains}
                onChange={(e) => setCryptoGains(Number(e.target.value))}
                className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={cryptoGains}
                onChange={(e) => setCryptoGains(Number(e.target.value))}
                className="w-24 p-2 border rounded-lg text-right"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Annual exempt amount of £3,000 applies.
            </p>
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
                checked={isHigherCryptoTax}
                onChange={() => setIsHigherCryptoTax(!isHigherCryptoTax)}
              />
              <span className="ml-2 text-gray-700">
                Apply higher tax rate (24%). Unchecked applies lower rate (18%).
              </span>
            </label>
          </div>
        </div>

        {/* Tax Reliefs Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tax Reliefs</h2>
          {[
            { label: "VCT Investments (£)", value: vct, setter: setVct, max: 200000 },
            { label: "EIS Investments (£)", value: eis, setter: setEis, max: 1000000 },
            { label: "SEIS Investments (£)", value: seis, setter: setSeis, max: 100000 },
          ].map((relief, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {relief.label}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max={relief.max}
                  value={relief.value}
                  onChange={(e) => relief.setter(Number(e.target.value))}
                  className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  value={relief.value}
                  onChange={(e) => relief.setter(Number(e.target.value))}
                  className="w-24 p-2 border rounded-lg text-right"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {relief.label === "VCT Investments (£)"
                  ? "30% relief on investments up to £200,000 annually. Relief applies to income tax."
                  : relief.label === "EIS Investments (£)"
                  ? "30% relief on investments up to £1,000,000 annually. Relief applies to capital gains tax."
                  : "50% relief on investments up to £100,000 annually. Relief applies to capital gains tax."}
              </p>
            </div>
          ))}
        </div>

        {/* Calculate Tax Button */}
        <button
          onClick={calculateTax}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Calculate Tax
        </button>

        {/* Results Section */}
        {taxBill !== null && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
            <p className="text-lg">
              <strong>Total Tax Bill:</strong> £{taxBill}
            </p>
            <p className="text-lg">
              <strong>Effective Tax Rate:</strong> {effectiveTaxRate}%
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Tax Breakdown:</h3>
              <p>Income Tax: £{taxBreakdown.incomeTax}</p>
              <p>Capital Gains Tax: £{taxBreakdown.capitalGainsTax}</p>
              <p>Total Reliefs: £{taxBreakdown.totalReliefs}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;
