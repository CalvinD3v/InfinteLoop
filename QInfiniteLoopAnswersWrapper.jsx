/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';

import { TransitionGroup, Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import React from 'react';
import AnswersCard from './AnswersCard';
import { AddButtonWrapper } from './styledComponents/AddButtonWrapper';
import Button from '../../Button/Button';

const StyledWrapper = styled.div`
    max-width: 50%;
    @media (max-width: 768px) {
        max-width: initial;
    }
`;

const transitionStyles = {
    entering: { flexGrow: 0.001, display: 'block' },
    entered: {
        flexGrow: 1,
        display: 'block',
    },
    exiting: { flexGrow: 0.5, transition: 'flex-grow 400ms linear' },
    exited: { flexGrow: 0.001 },
};

const defaultStyle = {
    transition: 'flex-grow 300ms ease',
    flexGrow: 0.001,
};

const MapValuesToQuestionAndAnswerLabel = (answerValues, questions) =>
    Object.keys(answerValues).map(questionCode => {
        const thisQuestion = questions.find(q => q.code === questionCode);
        switch (thisQuestion.type) {
            case 'text':
            case 'vehicleSearch':
            case 'postalCode':
            case 'currency': // maybe need to prepend unit?
            case 'integer':
            case 'date': // maybe need to format nicely
                return {
                    answer: answerValues[questionCode],
                    question: thisQuestion.text,
                };
            case 'bool':
                return answerValues[questionCode] === thisQuestion.trueValue
                    ? {
                          answer: thisQuestion.trueLabel,
                          question: thisQuestion.text,
                      }
                    : {
                          answer: thisQuestion.falseLabel,
                          question: thisQuestion.text,
                      };
            case 'singleChoice':
                return {
                    answer: thisQuestion.options.find(
                        o => o.value === answerValues[questionCode]
                    ).label,
                    question: thisQuestion.text,
                };
            case 'multipleChoice':
                return {
                    answer: thisQuestion.options
                        .filter(o =>
                            answerValues[questionCode].includes(o.value)
                        )
                        .map(item => item.label)
                        .join(', '),
                    question: thisQuestion.text,
                };
            default:
                return { answer: '', question: '' };
        }
    });

const defaultAnswerStyle = {
    transition: 'transform 400ms ease, opacity 300ms ease',
};

const answertransitionStyles = {
    entering: {
        opacity: 0,
        transform: 'translateX(-0.5vw)',
    },
    entered: { opacity: 1, transform: 'translateX(0)' },
    exiting: {
        opacity: 0.5,
        transform: 'translateX(-0.25vw)',
    },
    exited: {
        opacity: 0,
        transform: 'translateX(-0.5vw)',
    },
};

const RenderAnswer = answer => {
    return (
        <AnswersCard
            answers={MapValuesToQuestionAndAnswerLabel(
                answer.answer,
                answer.questions
            )}
            index={answer.index}
        >
            <AddButtonWrapper>
                <Button
                    type="toggle"
                    id="add-LE-group"
                    label="Remove"
                    toggleStatus="toggle-add"
                    clickCallback={() => {
                        answer.removeAnswerCallback(answer.index);
                    }}
                />
            </AddButtonWrapper>
        </AnswersCard>
    );
};

export const QInfiniteLoopAnswersWrapper = ({ children, ...props }) => {
    return (
        <Transition
            component={{ StyledWrapper }}
            in={props.hasAnswers}
            timeout={{
                enter: 300,
                exit: 400,
            }}
        >
            {state => (
                <TransitionGroup
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                    }}
                >
                    {props.answers?.map((asv, index) => {
                        return (
                            <Transition in timeout={400}>
                                {answerState => (
                                    <div
                                        style={{
                                            ...defaultAnswerStyle,
                                            ...answertransitionStyles[
                                                answerState
                                            ],
                                        }}
                                    >
                                        <RenderAnswer
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                            answer={asv}
                                            index={index}
                                            questions={props.questions}
                                            removeAnswerCallback={
                                                props.removeAnswerCallback
                                            }
                                        />
                                    </div>
                                )}
                            </Transition>
                        );
                    })}
                </TransitionGroup>
            )}
        </Transition>
    );
};

QInfiniteLoopAnswersWrapper.propTypes = {
    hasAnswers: PropTypes.bool,
    answers: PropTypes.array,
    questions: PropTypes.array,
    removeAnswerCallback: PropTypes.func,
};
