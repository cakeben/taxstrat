import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
  Avatar,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 6, sm: 8 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '100%',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 20px 45px rgba(37, 99, 235, 0.25)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Typography variant="h4" align="center" gutterBottom>
            About Tax Strategy Calculator
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            Tax Strategy Calculator is a learning tool for UK investors, founders, and
            employees who want a clearer picture of how income, dividends, and capital
            gains interact. It brings the rules for allowances, tax bands, and reliefs
            into a single, interactive view so you can explore scenarios with confidence.
          </Typography>

          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Why the app exists
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Understanding UK tax planning usually requires piecing together dense
                guidance from HMRC, accountants, and finance blogs. This app condenses
                those fundamentals into sliders and inputs, showing immediately how each
                choice affects your total bill and effective rate. It is intentionally
                exploratory—run as many what-if calculations as you need without waiting
                for a spreadsheet to catch up.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                What you can do here
              </Typography>
              <Box component="ul" sx={{ pl: 3, color: 'text.secondary', m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  Compare salary, dividend, and crypto gain combinations against the
                  latest UK tax bands.
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  Visualise how relief schemes such as VCT, EIS, and SEIS offset income
                  and capital gains tax liabilities.
                </Box>
                <Box component="li">
                  Communicate results clearly with a breakdown of income tax, capital
                  gains tax, and total relief claimed.
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              gap={3}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 72,
                  height: 72,
                  fontSize: '1.75rem',
                  fontWeight: 600,
                }}
              >
                TS
              </Avatar>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Meet the author
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Tax Strategy Calculator is curated by an independent developer and
                  finance enthusiast who shares insights under the moniker
                  <strong> Tax Strat Dev</strong>. Their background spans full-stack
                  engineering and personal finance coaching, with a focus on demystifying
                  allowances, reliefs, and incentives for early-stage founders and
                  investors.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Beyond the calculator, the author publishes walkthroughs on making tax
                  planning approachable, answers community questions, and keeps the app
                  aligned with the latest HMRC guidance.
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box textAlign="center">
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Ready to experiment with your own numbers?
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
                  boxShadow: '0 12px 30px rgba(37, 99, 235, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1d4ed8, #2563eb)',
                  },
                }}
              >
                Open the calculator
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutPage;
