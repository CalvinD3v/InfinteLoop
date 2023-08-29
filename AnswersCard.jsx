/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { AnswerCardContent } from './styledComponents/AnswerCardContent';

const AnswersCard = props => {
    const { answers, index, children } = props;

    return (
        <AnswerCardContent>
            {answers.map(a =>
                typeof a.answer === 'object' ? (
                    <div key={`${JSON.stringify(a)}-infiniteloop-${index}`}>
                        <p
                            style={{
                                fontSize: 12,
                                color: 'grey',
                                marginBottom: '8px',
                            }}
                        >
                            {a.question}
                        </p>
                        <div>
                            {a.answer.make ? (
                                <p>
                                    {a.answer.make} {a.answer.model}{' '}
                                    {a.answer.year}
                                </p>
                            ) : (
                                <p>
                                    {a.answer.suburb} {a.answer.postalCode}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div key={`${JSON.stringify(a)}-infiniteloop-${index}`}>
                        <p
                            style={{
                                fontSize: 12,
                                color: 'grey',
                                marginBottom: '8px',
                            }}
                        >
                            {a.question}
                        </p>
                        {a.answer}
                    </div>
                )
            )}
            {children}
        </AnswerCardContent>
    );
};

AnswersCard.protoTypes = {
    answers: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number,
    removeCardCallback: PropTypes.func,
};

export default AnswersCard;
