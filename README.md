# InfinteLoop (Boundless loop field)
Dynamic and Reusable Formik Field
![image](https://github.com/CalvinD3v/InfinteLoop/assets/49398574/f2503681-8c7c-4c68-a264-09a5575933ac)


## Business Requirements
- One Field that contains multiple values of different types of field types
- The user should be able to add and remove as many items as they wish.
- The field should be used within [Formik](https://jaredpalmer.com/formik/) and support all field types.
- Validation of the Infinite loop field should sit at the parent level
- Each question type has its own schema and validation rule.
- Render a set of questions dynamically based on schema created by the backend
- Support different question types
    - Boolean
    - Currency
    - Integer
    - Date
    - etc.
- Each question type has its own schema and validation rule.
- Validate all fields and show error messages (if applicable) on submit. If the form is valid, invoke a callback with all fields' values.
- Support external bind submit handler (trigger submit from the outside of the form)
- Support rendering nth-level nested group but this feature is not extensively tested.
- A question will invoke its callback function (if provided) when its value changes depending on the question type.
- Support parent/child relationship

## Implementation
This form is implemented using [Formik](https://jaredpalmer.com/formik/) with custom field components. Formik is very powerful but takes some time to learn. As with any library, you should take time to consult the docos to implement features *the Formik's way* and avoid pitfalls.

There is a `displayFormikState` prop in **FormikWrapper** that can be turned on to show Formik's internal state for debugging and troubleshooting.

It also used `@reach/component-component` to invoke a *isValidCallback* whenever the form becomes valid. 
