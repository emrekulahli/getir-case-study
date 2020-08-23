const yup = require('yup');
//Yup is a JavaScript schema builder for value parsing and validation.

const validateFilterParams = (req, res, next) => {

    //Define rules
    const schema = yup.object().shape({
        startDate: yup.date()
            .typeError('Start date must be a valid date!')
            .required('Start date is required!'),
        endDate: yup.date()
            .typeError('End date must be a valid date!')
            .min(yup.ref('startDate'), 'End date should be after than start date!')
            .required('End date is required!'),
        minCount: yup.number()
            .typeError('Min count must be a number!')
            .required('Min count is required!'),
        maxCount: yup.number()
            .typeError('Max count must be a number!')
            .moreThan(yup.ref('minCount'), 'Max count should be bigger than min count!')
            .required('Max count is required!')
    })

    //Validate schema
    schema.validate(req.body, { abortEarly: false }).then(() => {

        next()

    }).catch(({ errors }) => {

        res.status(400).json({
            code: 5,
            msg: errors
        })

    })

}

module.exports = {
    validateFilterParams
}