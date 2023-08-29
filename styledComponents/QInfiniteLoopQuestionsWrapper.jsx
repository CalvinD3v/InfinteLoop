import { Transition } from 'react-transition-group';
import React from 'react';
import PropTypes from 'prop-types';

const transitionStyles = {
    entering: { flexGrow: 1, display: 'block' },
};

const defaultStyle = {
    transition: 'flex-grow 300ms ease',
    flexGrow: 1,
    minWidth: '50%',
};

export const QInfiniteLoopQuestionsWrapper = props => (
    <Transition
        // eslint-disable-next-line react/destructuring-assignment
        in={!props.hasAnswers}
        timeout={300}
    >
        {state => (
            <div
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                }}
            >
                {props.children}
            </div>
        )}
    </Transition>
);

QInfiniteLoopQuestionsWrapper.propTypes = {
    hasAnswers: PropTypes.bool,
    children: PropTypes.any,
};
