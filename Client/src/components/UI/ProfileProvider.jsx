/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';
import "../../styles/providerProfile.css" // Import custom CSS styles

const Edit = () => {
    const [avatar, setAvatar] = useState('');
    const [fullName, setFullName] = useState('Johnatan Smith');
    const [email, setEmail] = useState('example@example.com');
    const [phone, setPhone] = useState('(097) 234-5678');
    const [mobile, setMobile] = useState('(098) 765-4321');
    const [address, setAddress] = useState('Bay Area, San Francisco, CA');

    const handleAvatarChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setAvatar(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleMobileChange = (event) => {
        setMobile(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            fullName,
            email,
            phone,
            mobile,
            address,
        });
    };

    return (
        <div className="profile-page-container">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card>
                            <Card.Header as="h5" className="profile-header">Profile</Card.Header>
                            <Card.Body>
                                <div className="avatar-container">
                                    <Image src={avatar} roundedCircle className="avatar" width={150} height={150} />
                                    <div className="upload-btn-wrapper">
                                        <Button variant="primary">Choose Avatar</Button>
                                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                                    </div>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" value={fullName} onChange={handleFullNameChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value={email} onChange={handleEmailChange} />
                                    </Form.Group>

                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" value={phone} onChange={handlePhoneChange} />
                                    </Form.Group>
                                    

                                    <Form.Group controlId="formAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" value={address} onChange={handleAddressChange} />
                                    </Form.Group>

                                    <div className="text-center mt-4">
                                        <Button variant="primary" type="submit">Save Changes</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Edit;