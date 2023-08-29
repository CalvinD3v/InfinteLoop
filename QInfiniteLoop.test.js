import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import FormikWrapper from '../FormikWrapper/FormikWrapper';
import defaultTheme from '../../Shared/defaultTheme';

describe('<QInfinteLoop>', () => {
    test('1) should render sub questions with proper values', async () => {
        const questionSchema = {
            code: 'WhatBuildings241',
            text: 'What amount of time excess would you like?',
            type: 'infiniteLoop',
            order: 281,
            helpText:
                'Time excess is the amount of time where the machinery has broken down and the insurance provider will not cover the damages in this time window. You will only be covered after the excess period. Ecample: you choose a 24-hour excess period; when your machine breaks down the insurance provider will not cover any losses in the first 24 hours of the machine not working, they will only cover losses after the first 24 hours.\nLonger excess periods generally lead to lower premiums.',
            rules: [
                {
                    effectiveFrom: '01/01/2020',
                    expression: "ProductTypeCode = 'PI-PL'",
                },
            ],
            conditions: [],
            options: [
                {
                    code: 'BuildingName342',
                    text: 'What is the building name?',
                    type: 'text',
                    helpText: 'Building Name',
                },
                {
                    code: 'DoesHaveAlarm456',
                    text: 'Does it have an alarm?',
                    type: 'bool',
                    trueLabel: 'YES',
                    trueValue: 'Y',
                    falseLabel: 'NO',
                    falseValue: 'N',
                    innerLabel: true,
                    defaultValue: null,
                    trueFirst: true,
                    // text: 'Show public liability? question 3',
                },
                {
                    code: 'RoofType569',
                    text: 'What is the roof type?',
                    type: 'singleChoice',
                    helpText: 'help text',
                    controlType: 'RadioButtonList',
                    options: [
                        {
                            label: 'Thatch',
                            value: 'Thatch',
                            isDefault: false,
                        },
                        {
                            label: 'Tile',
                            value: 'Tile',
                            isDefault: false,
                        },
                        {
                            label: 'Steel',
                            value: 'Steel',
                            isDefault: false,
                        },
                    ],
                },
                {
                    code: 'Security5',
                    text: 'What Security does it have?',
                    type: 'multipleChoice',
                    helpText: 'Is this help text rendered correctly',
                    controlType: 'DropDownList',
                    options: [
                        {
                            label: 'Electric fence',
                            value: 'ElectricF',
                            isDefault: false,
                        },
                        {
                            label: 'Cameras',
                            value: 'Cameras',
                            isDefault: false,
                        },
                        {
                            label: 'Armed Gaurd',
                            value: 'ArmedG',
                            isDefault: false,
                        },
                        {
                            label: 'Direct Line to Batman',
                            value: 'batman',
                            isDefault: false,
                        },
                    ],
                },
            ],
        };

        const { findByText } = render(
            <ThemeProvider theme={defaultTheme}>
                <FormikWrapper
                    schema={[
                        {
                            questions: [questionSchema],
                        },
                    ]}
                />
            </ThemeProvider>
        );

        expect(await findByText(/What is the building name?/)).toBeDefined();
        expect(await findByText(/Does it have an alarm?/)).toBeDefined();
        expect(await findByText(/What is the roof type?/)).toBeDefined();
        expect(await findByText(/What Security does it have?/)).toBeDefined();
    });

    test('2) should render main label', async () => {
        const questionSchema = {
            code: 'WhatBuildings241',
            text: 'What amount of time excess would you like?',
            type: 'infiniteLoop',
            order: 281,
            helpText:
                'Time excess is the amount of time where the machinery has broken down and the insurance provider will not cover the damages in this time window. You will only be covered after the excess period. Ecample: you choose a 24-hour excess period; when your machine breaks down the insurance provider will not cover any losses in the first 24 hours of the machine not working, they will only cover losses after the first 24 hours.\nLonger excess periods generally lead to lower premiums.',
            rules: [
                {
                    effectiveFrom: '01/01/2020',
                    expression: "ProductTypeCode = 'PI-PL'",
                },
            ],
            conditions: [],
            options: [
                {
                    code: 'BuildingName342',
                    text: 'What is the building name?',
                    type: 'text',
                    helpText: 'Building Name',
                },
                {
                    code: 'DoesHaveAlarm456',
                    text: 'Does it have an alarm?',
                    type: 'bool',
                    trueLabel: 'YES',
                    trueValue: 'Y',
                    falseLabel: 'NO',
                    falseValue: 'N',
                    innerLabel: true,
                    defaultValue: null,
                    trueFirst: true,
                    // text: 'Show public liability? question 3',
                },
                {
                    code: 'RoofType569',
                    text: 'What is the roof type?',
                    type: 'singleChoice',
                    helpText: 'help text',
                    controlType: 'RadioButtonList',
                    options: [
                        {
                            label: 'Thatch',
                            value: 'Thatch',
                            isDefault: false,
                        },
                        {
                            label: 'Tile',
                            value: 'Tile',
                            isDefault: false,
                        },
                        {
                            label: 'Steel',
                            value: 'Steel',
                            isDefault: false,
                        },
                    ],
                },
                {
                    code: 'Security5',
                    text: 'What Security does it have?',
                    type: 'multipleChoice',
                    helpText: 'Is this help text rendered correctly',
                    controlType: 'DropDownList',
                    options: [
                        {
                            label: 'Electric fence',
                            value: 'ElectricF',
                            isDefault: false,
                        },
                        {
                            label: 'Cameras',
                            value: 'Cameras',
                            isDefault: false,
                        },
                        {
                            label: 'Armed Gaurd',
                            value: 'ArmedG',
                            isDefault: false,
                        },
                        {
                            label: 'Direct Line to Batman',
                            value: 'batman',
                            isDefault: false,
                        },
                    ],
                },
            ],
        };

        const { findByText } = render(
            <ThemeProvider theme={defaultTheme}>
                <FormikWrapper
                    schema={[
                        {
                            questions: [questionSchema],
                        },
                    ]}
                />
            </ThemeProvider>
        );

        expect(
            await findByText(/What amount of time excess would you like?/)
        ).toBeDefined();
    });
});
