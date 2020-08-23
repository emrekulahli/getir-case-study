const RecordModel = require('../models/Record')

const getRecords = async (params = {}) => {
    const {
        startDate,
        endDate,
        minCount,
        maxCount
    } = params;

    try {
        const records = await RecordModel.aggregate([
            // Required fields in record object with sum of counts
            {
                $project: {
                    _id: false,
                    key: 1,
                    createdAt: 1,
                    totalCount: {
                        $reduce: {
                            input: '$counts',
                            initialValue: 0,
                            in: { $add: ['$$value', '$$this'] }
                        }
                    }
                }
            },
            //Filtering data
            {
                $match: {
                    $and: [
                        { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } },
                        { totalCount: { $gt: minCount, $lt: maxCount } }
                    ]
                }
            }
        ]).exec()

        return Promise.resolve(records)

    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = {
    getRecords
}