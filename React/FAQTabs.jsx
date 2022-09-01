import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './faq.css';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import faqsCategoriesService from '../../services/faqCategories';
import faqsService from '../../services/faqsService';

const _logger = debug.extend('tabs');

function FAQTabs(props) {
    const [categories, setCategories] = useState({
        categoryData: [],
        categoriesMapped: [],
    });

    function localOnTabClicked(e) {
        props.onTabTitleClicked(e);
    }

    const [faqCategories, setFaqCategoriesData] = useState('All');

    useEffect(() => {
        if (faqCategories !== 'All') {
            faqsService.getByCategoryId({ localOnTabClicked }).then(onGetByCatSuccess).catch(onGetByCatError);
        } else {
            faqsService.getAll().then(onGetAllSuccess).catch(onGetAllError);
        }
        faqsCategoriesService.getAllCategories().then(onGetCatSuccess).catch(onGetCatError);
    }, []);

    const onGetCatSuccess = (data) => {
        let arrayOfCat = data.items;
        _logger({ arrayOfCat });

        setCategories((prevState) => {
            const pd = { ...prevState };
            pd.categoryData = arrayOfCat;
            pd.categoriesMapped = arrayOfCat.map(categoryMapped);

            return pd;
        });
    };

    const onGetCatError = (err) => {
        _logger(err);
    };

    const onGetByCatSuccess = (response) => {
        let arrayOfQC = response.data.items;
        _logger({ arrayOfQC });

        setFaqCategoriesData((prevState) => {
            const pd = { ...prevState };

            return pd;
        });
    };

    const onGetByCatError = (err) => {
        _logger(err);
    };

    const onGetAllSuccess = (response) => {
        let arrayOfQs = response.data.items;
        _logger({ arrayOfQs });

        setFaqCategoriesData((prevState) => {
            const pd = { ...prevState };
            pd.faqCategoriesData = arrayOfQs;
            pd.setFaqCategoriesData = arrayOfQs.map(categoryMapped);
            return pd;
        });
    };

    const onGetAllError = (err) => {
        _logger(err);
    };

    const [bgcolor, setBgcolor] = useState('black');
    const [textcolor, setTextcolor] = useState('white');

    const handleHighlightTab = () => {
        setBgcolor('white');
        setTextcolor('black');
    };

    const categoryMapped = (category) => (
        <Tab
            eventKey={category.id}
            key={category.id}
            onSelect={handleHighlightTab}
            style={{ backgroundColor: { bgcolor }, color: { textcolor } }}
            title={category.name}></Tab>
    );

    return (
        <React.Fragment>
            <Tabs defaultActiveKey="1" id="fill-tab-example" className="mb-3-faqs" fill onSelect={localOnTabClicked}>
                {categories.categoriesMapped}
            </Tabs>
        </React.Fragment>
    );
}

FAQTabs.propTypes = {
    tab: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
    index: PropTypes.number,
    onTabTitleClicked: PropTypes.func.isRequired,
};

export default FAQTabs;
