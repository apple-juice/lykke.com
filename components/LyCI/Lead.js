import React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';
import {Grid, Row, Col} from 'react-styled-flexboxgrid';

import {Lead} from '../Home/Lead';
import {Label} from '../MarketList';

const Section = styled(Lead)`
  @media all and (max-width: 767px) {
    padding-bottom: 20px;
  }
`;

export const Value = styled.div`
  margin-bottom: ${rem('15px')};
`;

export const ValueAccent = styled.div`
  color: ${p => p.theme.colors.dark};
  font-family: ${p => p.theme.fonts.headings};
  font-size: ${rem('30px')};
  font-weight: bold;
  line-height: 2;
`;

export const ValueText = styled.div`
  color: ${p => p.theme.colors.slate};
  font-size: ${rem('14px')};
  line-height: 1.2;
  opacity: 0.8;

  @media all and (min-width: 768px) {
    span {
      display: block;
      font-size: ${rem('16px')};
    }
  }
`;

export const Graph = styled.div``;

export const Info = styled.div`
  margin-bottom: ${rem('40px')};
  font-family: ${p => p.theme.fonts.headings};
  font-size: ${rem('20px')};
  line-height: 1.75;
  font-weight: 600;
  text-align: left;

  @media all and (min-width: 768px) {
    padding: ${rem('20px')} ${rem('24px')};
    background-color: ${p => p.theme.colors.white};
    border-radius: 8px;
    box-shadow: ${p => p.theme.boxShadow.light};
  }
`;

export const InfoTitle = styled.div`
  margin-bottom: ${rem('25px')};
  color: ${p => p.theme.colors.black};
  font-size: ${rem('30px')};
  line-height: normal;
`;

export const InfoTable = styled.table`
  width: 100%;
  text-align: right;

  tr {
    td {
      &:first-child {
        text-align: left;
      }
    }
  }

  & + & {
    margin-top: ${rem('25px')};
  }
`;

export const LeadText = styled.p`
  margin-bottom: ${rem('15px')} !important;
  font-size: ${rem('16px')} !important;
`;

export default ({lyci}) => (
  <Section>
    <Grid className="container">
      <Row className="justify-content-between">
        <Col xs={12} sm={7} md={6}>
          <h1>Lykke Crypto Index (LyCI)</h1>
          <LeadText className="lead">
            An index tracking the financial performance of the top 25
            cryptocurrencies.
          </LeadText>

          <Value>
            <Row className="align-items-center">
              <Col className="d-md-none">
                <ValueAccent>LyCI</ValueAccent>
              </Col>
              <Col>
                <ValueAccent>{lyci.price}</ValueAccent>
              </Col>
              {lyci.change && (
                <Col>
                  <Label dir={lyci.change > 0 ? 'up' : 'down'} big>
                    {lyci.change.toLocaleString(undefined, {
                      style: 'percent',
                      minimumFractionDigits: 2
                    })}
                  </Label>
                </Col>
              )}
              {lyci.change && (
                <Col>
                  <ValueText>
                    <span>24 hour change</span> {new Date().toLocaleString()}
                  </ValueText>
                </Col>
              )}
            </Row>
          </Value>

          <Graph />
        </Col>
        <Col xs={12} sm={5} md={4}>
          <Info>
            <InfoTitle className="d-none d-md-block">Key Numbers</InfoTitle>
            <InfoTable>
              <tbody>
              <tr>
                  <td>Current Value</td>
                  <td>{lyci.price}</td>
              </tr>
              <tr>
                  <td>Return</td>
                  <td className="text-green">+2.30%</td>
              </tr>
              <tr>
                  <td>5 day return</td>
                  <td className="text-green">+2.30%</td>
              </tr>
              <tr>
                  <td>1 month return</td>
                  <td className="text-red">-2.30%</td>
              </tr>
              </tbody>
            </InfoTable>
            <InfoTable>
              <tbody>
                <tr>
                    <td>24h Max</td>
                    <td>1112.34</td>
                </tr>
                <tr>
                    <td>24h Min</td>
                    <td>1112.34</td>
                </tr>
              </tbody>
            </InfoTable>
            <InfoTable>
              <tbody>
                <tr>
                    <td>24h Vol</td>
                    <td>22.12%</td>
                </tr>
                <tr>
                    <td>30d Vol</td>
                    <td>31.34%</td>
                </tr>
              </tbody>
            </InfoTable>
          </Info>
        </Col>
      </Row>
    </Grid>
  </Section>
);
