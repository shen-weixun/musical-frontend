import React from 'react';
import { Container, Image } from 'react-bootstrap';
import thumbnail4 from '../assets/menu.jpeg';

function MenuPage() {
    return (
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '60px 0' }}>
            <Container style={{ maxWidth: '800px', textAlign: 'center' }}>
                <h2
                    style={{
                        color: '#f4f4f4',
                        fontSize: '2.5rem',
                        marginBottom: '30px',
                        fontWeight: '600',
                        borderBottom: '2px solid #d1a05f',
                        display: 'inline-block',
                        paddingBottom: '10px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}
                >
                    Our Menu
                </h2>
                <Image
                    src={thumbnail4}
                    alt="菜單"
                    fluid
                    style={{
                        borderRadius: '10px',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
                        marginTop: '30px'
                    }}
                />
            </Container>
        </div>
    );
}

export default MenuPage;
