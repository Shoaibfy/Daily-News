import React, { Component } from 'react';
import { Card, Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';
import { AiOutlineCalendar } from 'react-icons/ai';
import moment from 'moment'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            source: '',
            text: ''
        }
    }

    recieveNews = () => {
        fetch('https://newsapi.org/v2/everything?q=Apple&from=2021-03-14&sortBy=popularity&apiKey=fed0bd43edc94f9d937c57d214d580b0')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ data: data.articles })
            })

    }
    componentDidMount() {
        this.recieveNews();
    }

    render() {
        console.log(this.state.source)
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">News-paper</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Source" id="basic-nav-dropdown">
                                <div style={{ height: 300, overflowY: 'scroll' }}>
                                    {this.state.data.map((item, index) =>
                                        <NavDropdown.Item key={index} style={{ zIndex: 100 }} onClick={() => { this.setState({ source: item.source.name }) }} value={item.source.name}>{item.source.name}</NavDropdown.Item>
                                    )}</div>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" disabled defaultValue={'Pramod Ray'} placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <LazyLoad height={500} offset={200} once={true}>
                    <div className='container App'>
                        <div className='row col-12'>

                            {this.state.data.filter(item => {
                                console.log('item', item)
                                return item.source.name.includes(this.state.source)



                            }).map((item, index) =>
                                <Card className='col-md-5 col-sm-6 col-lg-5 m-4' style={{ width: '18rem' }} key={index}>
                                    <a href={item.url}><Card.Img variant="top" src={item.urlToImage} /></a>

                                    <Card.Body>
                                        <div className='row my-2 d-flex justify-content-between'>
                                            <div>
                                                <span><AiOutlineCalendar /></span>
                                                <span className='ml-2 mt-1'>{moment(item.publishedAt).format('MMMM Do YYYY HH:mm')}</span>
                                            </div>
                                            <span> Author : {item.author}</span>
                                        </div>
                                        <Card.Title><a href={item.url}>{item.title}</a></Card.Title>
                                        {item.description}
                                    </Card.Body>
                                </Card>
                            )}




                        </div>

                    </div>
                </LazyLoad>
            </div>
        )
    }
}

export default ListView