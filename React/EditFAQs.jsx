import React, { useCallback } from 'react';
import faqsService from '../../services/faqsService';
import { useEffect, useState } from 'react';
import logger from 'sabio-debug';
import PropTypes from 'prop-types';
import './faq.css';
import toastr from 'toastr';
import FAQCards from './FAQCards';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const _logger = logger.extend('Edit');

function EditFAQs(props) {
    _logger('props', props);

    const [pageData, setPageData] = useState({
        faqArray: [],
        faqComponents: [],
    });

    useEffect(() => {
        faqsService.getAll().then(onGetFAQSuccess).catch(onGetFAQError);
    }, []);

    const onGetFAQSuccess = (data) => {
        let faqArrayFromApi = data.items;
        _logger(faqArrayFromApi);

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.faqArray = faqArrayFromApi;
            pd.faqComponents = faqArrayFromApi.map(faqMapped);

            return pd;
        });
    };

    const onGetFAQError = (err) => {
        _logger(err);
        toastr.error('Error');
    };

    const onDeleteRequested = useCallback((id) => {
        _logger('faq id', id);
        faqsService.deleteById(id).then(onDeleteSuccess).catch(onDeleteError);
    }, []);

    const onDeleteSuccess = (id) => {
        toastr.success('FAQ Deleted');
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.faqArray = [...pd.faqArray];

            const idxOf = pd.faqArray.findIndex((faq) => faq.id === id);
            if (idxOf >= 0) {
                pd.faqArray.splice(idxOf, 1);
                pd.faqComponents = pd.faqArray.map(faqMapped);
            }
            return pd;
        });
    };

    const onDeleteError = (err) => {
        _logger('Deleting', err);
        toastr.error('Error');
    };

    const faqMapped = (faq, index) => {
        return (
            <FAQCards
                index={index}
                setPageData={setPageData}
                key={faq.id}
                faq={faq}
                onDeleteBtnClicked={onDeleteRequested}
            />
        );
    };

    return (
        <React.Fragment>
            <div>
                <div className="row-faq">
                    <h1 className="create-h1">
                        <strong>Manage FAQs</strong>
                    </h1>
                    <div className="row">{pageData.faqComponents}</div>
                </div>

                <button type="submit" className="btn-backfaqs btn-rounded ">
                    <Link to="/faqs" className="text-faqs">
                        <FaArrowLeft /> Back To FAQs
                    </Link>
                </button>
            </div>
        </React.Fragment>
    );
}

EditFAQs.propTypes = {
    faq: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        categoryId: PropTypes.number.isRequired,
    }),
};

export default EditFAQs;
