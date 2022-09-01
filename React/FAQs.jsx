import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import FAQ from './FAQ';
import './faq.css';
import { useState, useEffect } from 'react';
import faqsService from '../../services/faqsService';
import debug from 'sabio-debug';
import FAQTabs from './FAQTabs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

const _logger = debug.extend('faqs');

function FAQs(props) {
    const [faqs, setFAQs] = useState({
        faqsData: [],
        faqsMapped: [],
    });

    useEffect(() => {
        faqsService.getAll().then(onGetFAQSuccess).catch(onGetFAQError);
    }, []);

    const onGetFAQSuccess = (data) => {
        let arrayOfQs = data.items;

        setFAQs((prevState) => {
            const pd = { ...prevState };
            pd.faqsData = arrayOfQs;
            pd.faqsMapped = arrayOfQs.map(faqMapped);
            return pd;
        });
    };

    const onGetFAQError = (err) => {
        _logger(err);
    };

    const onTabTitleClicked = (id) => {
        const catId = parseInt(id);
        if (catId === 1) {
            setFAQs((prevState) => {
                const newState = { ...prevState };
                let faq = newState.faqsData;
                newState.faqsMapped = faq.map(faqMapped);
                return newState;
            });
        } else {
            setFAQs((prevState) => {
                const newState = { ...prevState };
                let filteredFaq = newState.faqsData.filter((aFaq) => aFaq.categoryId === catId);
                newState.faqsMapped = filteredFaq.map(faqMapped);
                return newState;
            });
        }
    };

    const faqMapped = (faq, index) => <FAQ index={index} key={faq.id} faq={faq} />;

    return (
        <>
            <section id="faq" className="py-5">
                <Container>
                    <Row>
                        <Col>
                            <div className="text-center">
                                <h1 className="mt-0">
                                    <i className="frequently-asked-questions">FAQs</i>
                                </h1>
                                <h4>
                                    <i> We are happy to answer any questions you may have!</i>
                                </h4>
                                <p className="text-muted mt-3">
                                    <strong>
                                        Got a question? You will probably find your answer in this list of frequently
                                        asked questions.
                                    </strong>
                                </p>
                                <p className="text-muted mt-3">
                                    <strong>
                                        If you do not see your question on this page, contact us and we will gladly
                                        assist you.
                                    </strong>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="container">
                <FAQTabs onTabTitleClicked={onTabTitleClicked}></FAQTabs>
                <Accordion defaultActiveKey="1">{faqs.faqsMapped}</Accordion>
            </div>

            {props.currentUser?.roles?.includes('Admin') ? (
                <div className="text-center">
                    <Link to="/faqs/create">
                        <button type="submit" className="btn-faq-success btn-success rounded">
                            Create a Question <FaPlus />
                        </button>
                    </Link>
                </div>
            ) : null}
        </>
    );
}

FAQs.propTypes = {
    currentUser: PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default FAQs;
