import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

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

    // Income Tax Calculation with UK progressive bands
    // Personal allowance is reduced by £1 for every £2 over £100k of total income
    let adjustedAllowance = personalAllowance;
    const totalIncomePreTax = salary + dividends;
    if (totalIncomePreTax > 100000) {
      const reduction = Math.floor((totalIncomePreTax - 100000) / 2);
      adjustedAllowance = Math.max(0, adjustedAllowance - reduction);
    }

    const allowanceUsedOnSalary = Math.min(adjustedAllowance, salary);
    const remainingAllowance = Math.max(0, adjustedAllowance - allowanceUsedOnSalary);

    let taxableSalary = Math.max(0, salary - adjustedAllowance);
    let incomeTax = 0;
    const basicRateUpper = 50270;
    const higherRateUpper = 125140;

    if (taxableSalary <= basicRateUpper - adjustedAllowance) {
      incomeTax = taxableSalary * 0.2;
    } else if (taxableSalary <= higherRateUpper - adjustedAllowance) {
      incomeTax = (basicRateUpper - adjustedAllowance) * 0.2 +
        (taxableSalary - (basicRateUpper - adjustedAllowance)) * 0.4;
    } else {
      incomeTax = (basicRateUpper - adjustedAllowance) * 0.2 +
        (higherRateUpper - basicRateUpper) * 0.4 +
        (taxableSalary - (higherRateUpper - adjustedAllowance)) * 0.45;
    }

    // Dividend Tax Calculation - apply remaining allowance and rate bands
    let taxableDividends = Math.max(0, dividends - dividendAllowance - remainingAllowance);
    let dividendTax = 0;
    if (taxableDividends > 0) {
      const basicRateSpace = Math.max(0, basicRateUpper - adjustedAllowance - taxableSalary);
      const higherRateSpace = Math.max(0, higherRateUpper - basicRateUpper - Math.max(0, taxableSalary - (basicRateUpper - adjustedAllowance)));

      if (taxableDividends <= basicRateSpace) {
        dividendTax = taxableDividends * dividendRates[0];
      } else if (taxableDividends <= basicRateSpace + higherRateSpace) {
        dividendTax =
          basicRateSpace * dividendRates[0] +
          (taxableDividends - basicRateSpace) * dividendRates[1];
      } else {
        dividendTax =
          basicRateSpace * dividendRates[0] +
          higherRateSpace * dividendRates[1] +
          (taxableDividends - basicRateSpace - higherRateSpace) * dividendRates[2];
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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
      <Card sx={{ width: "100%", maxWidth: 700 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Tax Strategy Calculator
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
            This calculator helps you understand your total tax liability and effective tax rate based on your salary,
            dividends, crypto gains, and investments. It calculates income tax and capital gains tax, applying
            appropriate reliefs (e.g., VCT for income tax and EIS/SEIS for capital gains tax).
          </Typography>

        {/* Income Details Section */}
        <Box bgcolor="grey.100" p={2} borderRadius={1} mb={3}>
          <Typography variant="h6" gutterBottom>
            Income Details
          </Typography>
          <Box mb={2}>
            <Typography variant="subtitle2">Salary (£)</Typography>
            <Slider
              value={salary}
              onChange={(_, v) => setSalary(v)}
              min={0}
              max={100000}
              valueLabelDisplay="auto"
            />
            <TextField
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              size="small"
              fullWidth
            />
            <Typography variant="body2" color="text.secondary" mt={1}>
              Assumes a tax-free personal allowance of £12,570.
            </Typography>
            <ul style={{ marginLeft: "1rem" }}>
              <li>20% basic rate up to £50,270.</li>
              <li>40% rate from £50,271 to £125,140.</li>
              <li>45% on income above £125,140.</li>
              <li>
                Example: £60,000 salary pays 20% on £37,700 after the allowance
                and 40% on the rest.
              </li>
            </ul>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2">Dividends (£)</Typography>
            <Slider
              value={dividends}
              onChange={(_, v) => setDividends(v)}
              min={0}
              max={1000000}
              valueLabelDisplay="auto"
            />
            <TextField
              type="number"
              value={dividends}
              onChange={(e) => setDividends(Number(e.target.value))}
              size="small"
              fullWidth
            />
            <Typography variant="body2" color="text.secondary" mt={1}>
              £500 dividend allowance applies. Tax rates vary by income band.
            </Typography>
            <ul style={{ marginLeft: "1rem" }}>
              <li>No tax on the first £500 of dividends.</li>
              <li>8.75% basic rate, 33.75% higher rate, 39.35% additional rate.</li>
              <li>
                Example: £2,000 of dividends for a basic rate taxpayer results in
                £1,500 taxed at 8.75% (£131.25).
              </li>
            </ul>
          </Box>
        </Box>

        {/* Investment Gains Section */}
        <Box bgcolor="grey.100" p={2} borderRadius={1} mb={3}>
          <Typography variant="h6" gutterBottom>
            Investment Gains
          </Typography>
          <Box mb={2}>
            <Typography variant="subtitle2">Crypto Gains (£)</Typography>
            <Slider
              value={cryptoGains}
              onChange={(_, v) => setCryptoGains(v)}
              min={0}
              max={1000000}
              valueLabelDisplay="auto"
            />
            <TextField
              type="number"
              value={cryptoGains}
              onChange={(e) => setCryptoGains(Number(e.target.value))}
              size="small"
              fullWidth
            />
            <Typography variant="body2" color="text.secondary" mt={1}>
              Annual exempt amount of £3,000 applies.
            </Typography>
            <ul style={{ marginLeft: "1rem" }}>
              <li>No tax on the first £3,000 of gains.</li>
              <li>Taxed at 18% or 24% depending on the checkbox above.</li>
              <li>
                Example: £10,000 of gains taxed at 18% means £7,000 is taxed,
                creating a bill of £1,260.
              </li>
            </ul>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isHigherCryptoTax}
                  onChange={() => setIsHigherCryptoTax(!isHigherCryptoTax)}
                  color="primary"
                />
              }
              label="Apply higher tax rate (24%). Unchecked applies lower rate (18%)."
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        {/* Tax Reliefs Section */}
        <Box bgcolor="grey.100" p={2} borderRadius={1} mb={3}>
          <Typography variant="h6" gutterBottom>
            Tax Reliefs
          </Typography>
          {[
            { label: "VCT Investments (£)", value: vct, setter: setVct, max: 200000 },
            { label: "EIS Investments (£)", value: eis, setter: setEis, max: 1000000 },
            { label: "SEIS Investments (£)", value: seis, setter: setSeis, max: 100000 },
          ].map((relief, idx) => (
            <Box key={idx} mb={2}>
              <Typography variant="subtitle2">{relief.label}</Typography>
              <Slider
                value={relief.value}
                onChange={(_, v) => relief.setter(v)}
                min={0}
                max={relief.max}
                valueLabelDisplay="auto"
              />
              <TextField
                type="number"
                value={relief.value}
                onChange={(e) => relief.setter(Number(e.target.value))}
                size="small"
                fullWidth
              />
              <Typography variant="body2" color="text.secondary" mt={1}>
                {relief.label === "VCT Investments (£)"
                  ? "30% relief on investments up to £200,000 each year. Example: invest £10,000 and reduce income tax by £3,000."
                  : relief.label === "EIS Investments (£)"
                  ? "30% relief on investments up to £1,000,000 each year. Example: invest £5,000 and offset £1,500 of capital gains tax."
                  : "50% relief on investments up to £100,000 each year. Example: invest £20,000 and save £10,000 of capital gains tax."}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Calculate Tax Button */}
        <Button variant="contained" color="primary" fullWidth onClick={calculateTax}>
          Calculate Tax
        </Button>

        {/* Results Section */}
        {taxBill !== null && (
          <Box mt={3} bgcolor="grey.100" p={2} borderRadius={1}>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Typography>
              <strong>Total Tax Bill:</strong> £{taxBill}
            </Typography>
            <Typography>
              <strong>Effective Tax Rate:</strong> {effectiveTaxRate}%
            </Typography>
            <Box mt={1}>
              <Typography variant="subtitle2">Tax Breakdown:</Typography>
              <Typography>Income Tax: £{taxBreakdown.incomeTax}</Typography>
              <Typography>Capital Gains Tax: £{taxBreakdown.capitalGainsTax}</Typography>
              <Typography>Total Reliefs: £{taxBreakdown.totalReliefs}</Typography>
            </Box>
          </Box>
        )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaxCalculator;
