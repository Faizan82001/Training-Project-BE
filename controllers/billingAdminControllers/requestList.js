const Trip = require('../../models').trip;
const User = require('../../models').user;
const Patient = require('../../models').patient;
const sendResponse = require('../../utils/sendResponse').response;
const { Op } = require('sequelize');

const creatorInclude = {
    model: User,
    as: 'creator_data',
    attributes: [
        [
            Trip.sequelize.fn(
                'CONCAT',
                Trip.sequelize.col('creator_data.first_name'),
                ' ',
                Trip.sequelize.col('creator_data.last_name')
            ),
            'nurseName'
        ]
    ]
};

const assigneeInclude = {
    model: User,
    as: 'assignee_data',
    attributes: [
        [
            Trip.sequelize.fn(
                'CONCAT',
                Trip.sequelize.col('assignee_data.first_name'),
                ' ',
                Trip.sequelize.col('assignee_data.last_name')
            ),
            'assigneeName'
        ]
    ]
};

const patientInclude = {
    model: Patient,
    as: 'run_no',
    attributes: []
};

const getAllPaginationData = async (limit, pageNumber, totalRecords) => {

    const totalPages = Math.ceil(totalRecords / limit);
    const hasPrevPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;

    return {
        limit,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage: hasPrevPage ? pageNumber - 1 : null,
        nextPage: hasNextPage ? pageNumber + 1 : null,
        currentPage: pageNumber,
        totalDocs: totalRecords
    };
};

module.exports = async (req, res) => {
    try {
        const requestType = req.query.requestType || CONSTANTS.TRIP_STATUS.NEW;
        const subrequestType = req.query.status || undefined;
        const myRequest = req.query.myRequest || 'false';
        const pendingReqDetails = [
            'Assigned for Review',
            'Request more Information',
            'Data Provided'
        ];
        const approvedReqDetails = ['Approved', 'Approved with Exception'];

        let page = req.query.page || 1;
        page = parseInt(page);

        if (!page) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_PAGE
            };
        }
        const limit = CONSTANTS.PAGINATION.LIMIT;
        const offset = (page - 1) * limit;

        if (requestType === 'New Request') {
            const requestCount = await Trip.count({
                where: { status: 'New Request' }
            });

            const data = await Trip.findAll({
                where: { status: 'New Request' },
                include: [creatorInclude, patientInclude],
                attributes: {
                    include: [[Patient.sequelize.col('run_no.name'), 'patientName']]
                },
                order: [['updatedAt', 'DESC']],
                raw: true,
                limit,
                offset
            });
            const paginationData = await getAllPaginationData(limit, page, requestCount);
            sendResponse(res, null, { data, requestCount, paginationData }, null);
        } else if (requestType === 'pending') {
            await requestFunction(
                page,
                subrequestType,
                myRequest,
                offset,
                pendingReqDetails,
                req,
                res
            );
        } else if (requestType === 'approved') {
            await requestFunction(
                page,
                subrequestType,
                myRequest,
                offset,
                approvedReqDetails,
                req,
                res
            );
        } else {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_REQUEST
            };
        }
    } catch (error) {
        sendResponse(res, error, null, error.message, 400);
    }
};

const requestFunction = async (
    page,
    subrequestType,
    myRequest,
    offset,
    list,
    req,
    res
) => {
    const userInfo = req.body.user;
    const limit = CONSTANTS.PAGINATION.LIMIT;
    if (myRequest === 'false') {
        await handleWithoutMyReq(page, list, subrequestType, limit, offset, res);
    } else if (myRequest === 'true') {
        handleWithMyReq(page, list, subrequestType, limit, offset, userInfo.id, res);
    } else {
        throw {
            statusCode: 400,
            message: MESSAGES.INVALID_REQUEST
        };
    }
};

const handleWithoutMyReq = async (
    page,
    list,
    subrequestType,
    limit,
    offset,
    res
) => {
    if (subrequestType === undefined) {
        const requestCount = await findRequestCount(list);
        const data = await Trip.findAll({
            include: [creatorInclude, assigneeInclude, patientInclude],
            attributes: {
                include: [[Patient.sequelize.col('run_no.name'), 'patientName']]
            },
            where: {
                status: {
                    [Op.in]: list
                }
            },
            order: [['updatedAt', 'DESC']],
            raw: true,
            limit,
            offset
        });
        const paginationData = await getAllPaginationData(limit, page, requestCount);
        sendResponse(res, null, { data, requestCount, paginationData }, null);
    } else {
        const requestCount = await findRequestCount(list);
        const len = await findSubRequestCount(subrequestType);
        const data = await Trip.findAll({
            include: [creatorInclude, assigneeInclude, patientInclude],
            attributes: {
                include: [[Patient.sequelize.col('run_no.name'), 'patientName']]
            },
            where: {
                status: subrequestType
            },
            order: [['updatedAt', 'DESC']],
            raw: true,
            limit,
            offset
        });
        const paginationData = await getAllPaginationData(limit, page, len);
        sendResponse(res, null, { data, requestCount, paginationData }, null);
    }
};

const handleWithMyReq = async (
    page,
    list,
    subrequestType,
    limit,
    offset,
    id,
    res
) => {

    if (subrequestType === undefined) {
        const requestCount = await findRequestCount(list);
        const data = await Trip.findAll({
            include: [creatorInclude, assigneeInclude, patientInclude],
            attributes: {
                include: [[Patient.sequelize.col('run_no.name'), 'patientName']]
            },
            where: {
                status: {
                    [Op.in]: list
                },
                assignee: id
            },
            order: [['updatedAt', 'DESC']],
            raw: true,
            limit,
            offset
        });
        const len = await Trip.count({
            where: {
                assignee: id,
                status: {
                    [Op.in]: list
                }
            },
            raw: true
        });

        const paginationData = await getAllPaginationData(limit, page, len);
        sendResponse(res, null, { data, requestCount, paginationData }, null);
    } else {

        const requestCount = await findRequestCount(list);
        const data = await Trip.findAll({
            include: [creatorInclude, assigneeInclude, patientInclude],
            attributes: {
                include: [[Patient.sequelize.col('run_no.name'), 'patientName']]
            },
            where: {
                status: subrequestType,
                assignee: id
            },
            order: [['updatedAt', 'DESC']],
            raw: true,
            limit,
            offset
        });
        const len = await Trip.count({
            where: {
                status: subrequestType,
                assignee: id
            },
            raw: true
        });
        const paginationData = await getAllPaginationData(limit, page, len);
        sendResponse(res, null, { data, requestCount, paginationData }, null);
    }
};

const findRequestCount = async (list) => {
    return await Trip.count({
        where: {
            status: {
                [Op.in]: list
            }
        }
    });
};

const findSubRequestCount = async (subrequestType) => {
    return await Trip.count({
        where: {
            status: subrequestType
        }
    });
};

