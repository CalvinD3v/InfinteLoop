/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
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
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useAsyncEffect from 'use-async-effect';
import uuid from 'uuid';
import isEmpty from 'lodash/isEmpty';
import Button from '../../Button/Button';
import { QFieldConstants } from '../constants';
import { FieldError } from '../styledComponents';
import { QInfiniteLoopWrapper } from './styledComponents/QInfiniteLoopWrapper';
import { QInfiniteLoopQuestionsWrapper } from './styledComponents/QInfiniteLoopQuestionsWrapper';
import { QInfiniteLoopAnswersWrapper } from './QInfiniteLoopAnswersWrapper';
import { AddButtonWrapper } from './styledComponents/AddButtonWrapper';
import Label from './styledComponents/Label';

import { isConditionTrue, clearIfNotVisible } from '../FormikWrapper/utils';

export const QInfiteLoopValidation = (schema, isVisible) => value => {
    if (isVisible) {
        if (schema && (!value || value.length <= 2)) {
            return QFieldConstants.infiniteLoop.required;
        }
    }
    return undefined;
};

const QInfiniteLoop = props => {
    const {
        schema,
        form: {
            touched,
            errors,
            handleChange,
            setFieldValue,
            values,
            validateField,
            setTouched,
            setStatus,
            status,
        }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        field: { name, value },
        uiProps: {
            classNames,
            isVisible,
            fieldChangedCallback,
            childTag,
            activeProps: { activeHintTextName, toggleHintText },
        },
    } = props;

    const [currentValue, setCurrentValue] = useState([]);
    const [currentFields, setFields] = useState();
    const [answerSetValues, setAnswerSetValues] = useState([]);
    const [reRenderFormFields, setReRenderFormFields] = useState(false);
    const [formQuestionGetter, setFormQuestionGetter] = useState();
    const [fieldRegisterGetter, setFieldRegisterGetter] = useState();
    const [questionWrapperKey, setQuestionWrapperKey] = useState(uuid());
    const isInitialMount = useRef(true);

    useEffect(() => {
        clearIfNotVisible(name, value, setFieldValue, isVisible);
    }, [isVisible]);

    const validateFieldManually = async questionCode => {
        const question = schema.options.find(opt => opt.code === questionCode);
        const currentFormValues = Object.assign({}, ...currentValue);
        const questionAnswer = currentFormValues[questionCode];
        const isVisibleField = isEmpty(question.conditions)
            ? true
            : question.conditions.some(c =>
                isConditionTrue(c, values[c.question])
            );
        return {
            questionCode,
            error: fieldRegisterGetter.default[
                `${question.type}Validation`
            ](question, { isVisible: isVisibleField })(questionAnswer),
        };
    };

    const addAnswers = async () => {
        const questions = schema.options.map(q => q.code);
        const currentlyTouched = Object.assign(
            touched,
            ...questions.map(x => ({ [x]: true }))
        );
        props.form.setTouched(currentlyTouched);
        const validationResults = await Promise.all(
            questions.map(code => validateFieldManually(code))
        );
        // CHECK IF ANY OF THESE QUESIONS HAVE ERROR
        const isValid = validationResults.every(
            item => item.error === undefined
        );
        if (isValid) {
            const ordered = questions.map(d =>
                currentValue.find(i => Object.keys(i)[0] === d)
            );
            const currentFormValues = Object.assign({}, ...ordered);

            setAnswerSetValues(prevState => [...prevState, currentFormValues]);
            const unTouched = Object.assign(
                touched,
                ...questions.map(x => ({ [x]: false }))
            );
            props.form.setTouched(unTouched);
            Object.keys(currentFormValues).forEach(k => {
                setFieldValue(k, undefined);
                delete values[k];
            });
            // props.form.setStatus({});
            props.form.setStatus(
                Object.assign(
                    {},
                    ...validationResults.map(res => ({
                        [res.questionCode]: res.error,
                    }))
                )
            );
            setCurrentValue([]);
            setReRenderFormFields(ps => !ps);
            return;
        }
        props.form.setStatus(
            Object.assign(
                {},
                ...validationResults.map(res => ({
                    [res.questionCode]: res.error,
                }))
            )
        );
    };

    useAsyncEffect(async () => {
        // These are lazily imported on mount to avoid cyclic dependencies
        const formQuestions = await import('../FormikWrapper/FormQuestions');
        const QFieldRegister = await import('../QFieldRegister');
        setFormQuestionGetter(formQuestions);
        setFieldRegisterGetter(QFieldRegister);
        if (value && typeof value === 'string') {
            setAnswerSetValues(JSON.parse(value));
        }
    }, []);

    useEffect(() => {
        if (!formQuestionGetter) {
            return;
        }
        if (!fieldRegisterGetter) {
            return;
        }
        const fields = formQuestionGetter.default({
            schema: schema.options,
            values,
            sections: [],
            newSections: [],
            fieldChangedCallback: (label, val) => {
                setCurrentValue(prevState => [
                    ...prevState.filter(
                        item => !Object.keys(item).includes(label)
                    ),
                    { [label]: val },
                ]);
                // set infinite loop question to touched
                props.form.setTouched({ ...touched, [schema.code]: true });
            },
            errors,
            touched,
            activeProps: {
                activeHintTextName:
                    props.uiProps.activeProps.activeHintTextName,
                toggleHintText: fname => {
                    props.uiProps.activeProps.toggleHintText(fname);
                    setReRenderFormFields(ps => !ps);
                },
            },
            mustValidate: false,
        });
        setFields(fields);
        setQuestionWrapperKey(uuid());
    }, [formQuestionGetter, fieldRegisterGetter, reRenderFormFields]);

    useAsyncEffect(async () => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const jsonAnswers = JSON.stringify(answerSetValues);
            if (fieldChangedCallback) {
                await fieldChangedCallback(schema.code, jsonAnswers);
            }
            await setFieldValue(schema.code, jsonAnswers);
        }
    }, [answerSetValues]);

    // validation hook
    useEffect(() => {
        const lastUpdatedVal = currentValue[currentValue.length - 1];
        if (lastUpdatedVal) {
            const label = Object.keys(lastUpdatedVal)[0];
            validateFieldManually(label).then(res => {
                const oldStatus = status ?? {};
                const newStatus = Object.assign(oldStatus, {
                    [res.questionCode]: res.error,
                });
                props.form.setStatus(newStatus);
            });
        }
    }, [currentValue]);

    return (
        isVisible && (
            <div className="infinite-loop-answers-wrapper-styles" style={{maxWidth: '100%', marginBottom: '30px'}}>
                {!currentFields && <p>Loading...</p>}
                {
                    <div className="infinite-loop-answers-wrapper-styles" style={{maxWidth: '100%'}}>
                        <Label data-testid={`label-${schema.code}`}>
                            {schema.text}
                        </Label>
                        <QInfiniteLoopWrapper>
                            <QInfiniteLoopAnswersWrapper
                                hasAnswers={answerSetValues?.length > 0}
                                answers={answerSetValues}
                                questions={schema.options}
                                removeAnswerCallback={index =>
                                    setAnswerSetValues(prevState =>
                                        prevState.filter(
                                            i => i !== prevState[index]
                                        )
                                    )
                                }
                            ></QInfiniteLoopAnswersWrapper>
                            <QInfiniteLoopQuestionsWrapper
                                key={questionWrapperKey}
                                hasAnswers={answerSetValues?.length > 0}
                            >
                                {currentFields}
                                <AddButtonWrapper>
                                    <Button
                                        className=""
                                        disabled={false}
                                        type="toggle"
                                        label="Add"
                                        toggleStatus="toggle-add"
                                        clickCallback={async () => {
                                            await addAnswers();
                                        }}
                                    />
                                </AddButtonWrapper>
                            </QInfiniteLoopQuestionsWrapper>
                        </QInfiniteLoopWrapper>
                        {(errors[name] && touched[name] && (
                            <FieldError>{errors[name]}</FieldError>
                        )) ||
                            (!!status && status[name] && touched[name] && (
                                <FieldError>{status[name]}</FieldError>
                            ))}
                    </div>
                }
            </div>
        )
    );
};

QInfiniteLoop.protoTypes = {
    schema: PropTypes.shape({
        code: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        controlType: PropTypes.string,
        helpText: PropTypes.string,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                code: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                controlType: PropTypes.string,
                helpText: PropTypes.string,
                options: PropTypes.arrayOf(
                    PropTypes.shape({
                        label: PropTypes.string.isRequired,
                        value: PropTypes.any.isRequired,
                        isDefault: PropTypes.bool.isRequired,
                    })
                ),
            })
        ).isRequired,
    }),

    /** Formik properties */
    form: PropTypes.object,

    /** Formik properties */
    field: PropTypes.object,

    /** optional innerLabel flag */
    innerLabel: PropTypes.bool,

    /** custom props */
    uiProps: PropTypes.object,
};

export default QInfiniteLoop;
