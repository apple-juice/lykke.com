import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {Grid, Row, Col} from 'react-styled-flexboxgrid';
import Truncate from 'react-truncate';
import Button from '../Button';
import {rem} from 'polished';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const { SELF_URL } = publicRuntimeConfig

export const SectionLink = styled.div`    
  text-align: center;

  h4 {
    font-family: ${p => p.theme.fonts.primary};
    font-size: ${rem('24px')};
    font-weight: normal;
  }

  > button,
  > a {
    width: 100%;
    max-width: 340px;
    padding-top: ${rem('17px')};
    padding-bottom: ${rem('17px')};
    font-size: ${rem('16px')};
  }
  
  @media all and (max-width: 767px) {
    h4 {
      margin-bottom: 20px;
    }
  }
  
  @media all and (max-width: 420px) {
    > button,
    > a {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export const Section = styled.div`
  padding-top: ${rem('60px')};
  padding-bottom: ${rem('90px')};
  overflow: hidden;

  @media all and (max-width: 767px) {
    padding-top: 34px;
    padding-bottom: 34px;
  }
`;

export const News = styled.div`
  margin-bottom: ${rem('50px')};

  > ${Row} {
    margin-left: 0;
    margin-right: 0;

    > ${Col} {
      padding-left: 0;
      padding-right: 0;
    }
  }
  
  @media all and (max-width: 767px) {
    margin-bottom: 18px;
  }
`;

export const Wrapper = styled.div`
  @media all and (min-width: 992px) {
    > ${Row} {
      margin-left: ${rem('-25px')};
      margin-right: ${rem('-25px')};

      > ${Col} {
        padding-left: ${rem('25px')};
        padding-right: ${rem('25px')};
      }
    }
  }
`;

export const Item = styled.div`
  margin-bottom: ${rem('50px')};

  @media all and (max-width: 767px) {
    margin-bottom: 55px;
  }
`;

export const Image = styled.div`
  height: 170px;
  margin-bottom: ${rem('22px')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  a {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media all and (max-width: 767px) {
    margin-bottom: 16px;
  }
`;

export const Title = styled.h4`
  margin-bottom: ${rem('22px')};
  color: ${p => p.theme.colors.black};
  line-height: normal;

  a {
    color: inherit;
  }

  @media all and (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

export const Desc = styled.div`
  margin-bottom: ${rem('28px')};
  color: ${p => p.theme.colors.dark};
  font-size: ${rem('14px')};
  font-weight: normal;
  line-height: 1.36;
`;

export const Content = styled.div`
  overflow: hidden;
  padding-right: ${rem('20px')};
`;

export const ReadMore = styled.div`
  margin-top: 20px;
  font-size: ${rem('16px')};
  line-height: normal;
  letter-spacing: -0.2px;
    
  a {
    color: ${p => p.theme.colors.primary};
    letter-spacing: -0.2px;
  }
`;

export const Logo = styled.div`
  margin-bottom: ${rem('25px')};
  font-size: 0;
  line-height: 0;
`;

export const MainTitle = styled.h3`
  margin-bottom: ${rem('38px')};
  color: ${p => p.theme.colors.black};

  @media all and (max-width: 767px) {
    margin-bottom: 14px;
  }
`;

export const MainText = styled.p`
  line-height: 1.69;

  @media all and (max-width: 767px) {
    margin-bottom: 24px;
  }
`;

function createMarkup(desc) {
  return {__html: desc};
}

export default class extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/lykke`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          posts: data.items.slice(0, 3)
        });
      });
  }

  render() {
    const {posts} = this.state;
    return (
      <Section>
        <Wrapper as={Grid} className="container">
          <Row>
            <Col xs={12} md={6} md={3}>
              <Row className="align-items-center">
                <Col xs={12} sm={6} md={12}>
                  <MainTitle>
                      Lykke Medium <br/> Our news to you!
                  </MainTitle>
                </Col>
                <Col xs={12} sm={6} md={12}>
                  <MainText className="text-grey">
                      View our latest products, projects, listings and updates at Lykke Medium
                  </MainText>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={9}>
              <News>
                <Row>
                  {posts.map(post => (
                    <Col key={post.link} xs={12} sm={4}>
                      <Item>
                        <Image
                          style={{
                            backgroundImage: `url(${post.thumbnail})`
                          }}
                        >
                          <a href={post.link} target="_blank"/>
                        </Image>
                        <Content>
                          <Title>
                            <a href={post.link} target="_blank">{post.title}</a>
                          </Title>
                          {/* <Desc>
                        <Truncate lines={2}>
                          <div
                            dangerouslySetInnerHTML={createMarkup(
                              post.description
                            )}
                          />
                        </Truncate>
                      </Desc> */}
                          <ReadMore>
                            <a href={post.link} target="_blank">Continue reading</a>
                          </ReadMore>
                        </Content>
                      </Item>
                    </Col>
                  ))}
                </Row>
              </News>
            </Col>
          </Row>

          <SectionLink>
            <h4>Share. Discuss. Connect.</h4>
            <Button bordered href="https://medium.com/lykke">
              Subscribe to newsletter
            </Button>
          </SectionLink>
        </Wrapper>
      </Section>
    );
  }
}
