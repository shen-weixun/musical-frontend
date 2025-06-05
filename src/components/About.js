import { Col, Container, Row, Image } from 'react-bootstrap';
import Banner from './Banner';
import aboutImg from '../assets/alchol.jpg';

function About() {
    return (
        <>
            <Banner />

            <div style={{ backgroundColor: '#121212', color: '#f0f0f0', padding: '60px 0' }}>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col md="auto">
                            <h2
                                style={{
                                    color: '#f4f4f4',
                                    borderBottom: '2px solid #E9A178',
                                    paddingBottom: '8px',
                                    marginBottom: '30px',
                                    fontWeight: '600',
                                }}
                            >
                                About
                            </h2>
                        </Col>
                        <Col></Col>
                    </Row>

                    <Row style={{ padding: '30px 0' }}>
                        <Col
                            md={6}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ maxWidth: '90%' }}>
                                <h3>
                                    走進
                                    <strong style={{ color: '#E9A178' }}> Night Pour </strong>
                                    餐酒館
                                </h3>
                                <br />
                                <p style={{ color: '#bbbbbb', lineHeight: '1.8' }}>
                                    夜酌之所 Night Pour —— 在深夜裡，為你緩慢傾倒一杯世界的味道。
                                    <br />
                                    當城市喧囂逐漸沉靜，「夜酌之所」悄然點亮。這裡不只是一間餐廳，而是一個屬於深夜靈魂的棲身地。低光線的氛圍，如夜色般包裹著空間，讓思緒與味蕾一同放鬆流動。
                                    <br />
                                    <br />
                                    我們從世界各地汲取靈感，為你調配出一套獨特的異國風味菜單——美式的清晨煎蛋捲、義式的番茄羅勒麵、日式的照燒雞，都是這趟深夜航程的風景。而酒單上的每一款選物，也都細細挑選，為深夜加添一抹暖意。
                                    <br />
                                    <br />
                                    Night Pour，不只為你倒上一杯酒，更為你倒出一段靜謐的時光。
                                    <br />
                                    來吧，在這裡，你不需要說太多話，只需讓味道替你表達。
                                </p>
                            </div>
                        </Col>

                        <Col md={6}>
                            <Image
                                src={aboutImg}
                                alt="關於我們"
                                fluid
                                style={{
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.5)',
                                    maxHeight: '40rem',
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default About;
