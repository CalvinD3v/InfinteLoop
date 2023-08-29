# InfinteLoop (Boundless loop field)
Dynamic and Reusable Formik Field

## Requirements
- Render a set of questions dynamically based on schema created by the backend
- Support different question types
    - Boolean
    - Currency
    - Integer
    - Date
    - etc.
- Each question type has its own schema and validation rule.
- Validate all fields and show error messags (if applicable) on submit. If form is valid, invoke callback with all fields' values.
- Support external bind submit handler (trigger submit from the outside of the form)
- Support rendering nth-level nested group but this feature is not extensively tested.
- A question will invoke its callback function (if provided) when it's value changed depending on question type.
- Support parent/child relationship (see section below)

## Implementation
This form is implemented using [Formik](https://jaredpalmer.com/formik/) with custom field components. Formik is very powerful but takes some time to learn. As with any library, you should take time to consult the docos to implement features *the Formik's way* and avoid pitfalls.

There is a `displayFormikState` prop in **FormikWrapper** that can be turned on to show Formik's internal state for debugging and troubleshooting.

It also used `@reach/component-component` to invoke a *isValidCallback* whenever the form becomes valid. 
